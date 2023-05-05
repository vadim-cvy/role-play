import type { ChatCompletionRequestMessage, CreateChatCompletionRequest } from "openai"
import OpenAI from "../OpenAI"
import GPTMetaGenerator from "./meta/GPTMetaGenerator"

export default class GPT
{
  protected static instance?: GPT

  static async getInstance()
  {
    if ( ! this.instance )
    {
      const instance = new this()

      if ( this.initialPrompt )
      {
        await instance.sendMessageSave( this.initialPrompt )
      }

      this.instance = instance
    }

    return this.instance
  }

  protected static get initialPrompt() : string
  {
    throw new Error( 'This prop is abstract and needs implementation!' )
  }

  protected constructor(
    protected model: CreateChatCompletionRequest['model'] = 'gpt-3.5-turbo'
  ) {}

  protected isPerformingAPIRequest = false

  protected pendingMessages: {
    message: ChatCompletionRequestMessage
    resolve: ( assistantMessageContent: string ) => void
  }[] = []

  public history: CreateChatCompletionRequest['messages'] = []

  public readonly metaGenerator = new GPTMetaGenerator( this )

  public async init()
  {
    throw new Error( 'This method is abstract and must be implemented!' )
  }

  public async sendMessageSave( userMessageContent: string )
  {
    return this.sendMessage( userMessageContent )
    .then( assistantMessageContent =>
    {
      this.history.push({
        role: 'user',
        content: userMessageContent,
      })

      this.history.push({
        role: 'assistant',
        content: assistantMessageContent,
      })

      return assistantMessageContent
    })
    .then( async ( assistantMessageContent ) =>
    {
      await this.metaGenerator.sync()

      return assistantMessageContent
    })
  }

  public async sendMessage( userMessageContent: string )
  {
    return new Promise<string>( resolve =>
    {
      this.pendingMessages.push({
        message: {
          role: 'user',
          content: userMessageContent,
        },
        resolve,
      })

      this.sendNextPending()
    })
  }

  protected sendNextPending()
  {
    if ( this.isPerformingAPIRequest )
    {
      return
    }

    const pendingMessage = this.pendingMessages.shift()

    if ( ! pendingMessage )
    {
      return
    }

    this.isPerformingAPIRequest = true

    const requestMessages: GPT['history'] = [
      ...this.history,
      pendingMessage.message
    ]
console.log( 'user: ' + pendingMessage.message.content )
    OpenAI.createChatCompletion({
      model: this.model,
      messages: requestMessages,
      // todo: improve. https://platform.openai.com/docs/api-reference/completions/create > Completions > Request Body
    })
    .then( response => this.extractAPIRequestAssistantMessage( response ) )
// todo: remove
.then( assistantMessage =>
{
  console.log( assistantMessage )
  return assistantMessage
} )
    .then( assistantMessage => pendingMessage.resolve( assistantMessage.content ) )
    .catch( error =>
    {
      console.error( error )

      // todo: handle
      throw new Error( 'Something goes wrong!' )
    })
    .finally(() =>
    {
      this.isPerformingAPIRequest = false

      this.sendNextPending()
    })
  }

  protected extractAPIRequestAssistantMessage( httpResponse: Awaited<ReturnType<typeof OpenAI['createChatCompletion']>> )
  {
    const response = httpResponse.data.choices[0]

    if ( response.finish_reason !== 'stop' )
    {
      // todo: handle this case
      throw new Error( 'Unexpected finish reason!' )
    }

    if ( ! response.message )
    {
      // todo: handle this case
      throw new Error( 'Something goes wrong!' )
    }

    return response.message
  }
}