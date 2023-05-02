import type { ChatCompletionRequestMessage, CreateChatCompletionRequest } from "openai"
import OpenAI from "./OpenAI"

export default class Chat
{
  constructor(
    // todo: set v.4 turbo if exists
    protected model: CreateChatCompletionRequest['model'] = 'gpt-3.5-turbo'
  ) {}

  protected currentAPIRequest?: ReturnType<typeof OpenAI['createChatCompletion']>

  protected pendingMessages: {
    messageContent: string
    resolve: ( assistantMessageContent: string ) => void
  }[] = []

  public history: CreateChatCompletionRequest['messages'] = []

  public sendUserMessageSave(
    content: string,
    prepareHistoryUserContent?: ( original: string ) => string,
    prepareHistoryAssistantContent?: ( original: string ) => string
  )
  {
    const request = this.sendUserMessage( content )

    request.then( assistantResponseContent =>
    {
      this.history.push({
        role: 'user',
        content: prepareHistoryUserContent ? prepareHistoryUserContent( content ) : content
      })

      this.history.push({
        role: 'assistant',
        content:
          prepareHistoryAssistantContent ?
          prepareHistoryAssistantContent( assistantResponseContent ) :
          assistantResponseContent
      })
    })

    return request
  }

  public sendUserMessage( messageContent: string )
  {
    return new Promise<string>( resolve =>
    {
      if ( this.pendingMessages.length )
      {
        this.pendingMessages.push({
          messageContent,
          resolve
        })

        return
      }

      this.createAPIRequest([
        ...this.history,
        {
          role: 'user',
          content: messageContent,
        }
      ])
      .then( response => resolve( this.extractResponseAssistantMessageContent( response ) ) )
      .finally( () => setTimeout(
        () =>
        {
          const pendingMessage = this.pendingMessages.shift()

          if ( pendingMessage )
          {
            this.sendUserMessage( pendingMessage.messageContent ).then( assistantResponse =>
              pendingMessage.resolve( assistantResponse )
            )
          }
        },
        1000
      ))
    })
  }

  protected createAPIRequest( messages: CreateChatCompletionRequest['messages'] )
  {
    this.currentAPIRequest = OpenAI.createChatCompletion({
      model: this.model,
      messages,
    })

    this.currentAPIRequest
    // todo: handle
    .catch( error =>
    {
      throw new Error( 'Something goes wrong!' )
    })
    .finally( () => this.currentAPIRequest = undefined )

    return this.currentAPIRequest
  }

  protected extractResponseAssistantMessageContent( httpResponse: Awaited<ReturnType<typeof OpenAI['createChatCompletion']>> )
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
console.log( response.message.content )
    return response.message.content
  }
}