import type { ChatCompletionRequestMessage, CreateChatCompletionRequest } from "openai"
import OpenAI from "./OpenAI"

export default class Chat
{
  constructor(
    // todo: set v.4 turbo if exists
    protected model: CreateChatCompletionRequest['model'] = 'gpt-3.5-turbo'
  ) {}

  protected readonly API_MAX_REQUESTS_PER_MIN = 3500

  protected isPerformingAPIRequest = false

  protected lastAPIResponseTime = 0

  protected pendingMessages: {
    message: ChatCompletionRequestMessage
    onSent: ( assistantMessageContent: string ) => void
  }[] = []

  public history: CreateChatCompletionRequest['messages'] = []

  public sendMessageSave(
    content: string,
    prepareHistoryUserContent?: ( original: string ) => string,
    prepareHistoryAssistantContent?: ( original: string ) => string
  )
  {
    const request = this.sendMessage( content )

    request.then( assistantMessageContent =>
    {
      this.history.push({
        role: 'user',
        content: prepareHistoryUserContent ? prepareHistoryUserContent( content ) : content
      })

      this.history.push({
        role: 'assistant',
        content:
          prepareHistoryAssistantContent ?
          prepareHistoryAssistantContent( assistantMessageContent ) :
          assistantMessageContent
      })
    })

    return request
  }

  public sendMessage( messageContent: string )
  {
    return new Promise<string>( resolve =>
    {
      this.pendingMessages.push({
        message: {
          role: 'user',
          content: messageContent,
        },
        onSent: assistantMessageContent => resolve( assistantMessageContent ),
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

    const
      requestsMinInterval = 60 / this.API_MAX_REQUESTS_PER_MIN * 1000,
      timeFromPrevRequest = Date.now() - this.lastAPIResponseTime

    if ( timeFromPrevRequest < requestsMinInterval )
    {
      setTimeout(
        () => this.sendNextPending(),
        requestsMinInterval - timeFromPrevRequest
      )

      return
    }

    const pendingMessage = this.pendingMessages.shift()

    if ( ! pendingMessage )
    {
      return
    }

    this.isPerformingAPIRequest = true

    const requestMessages = [
      ...this.history,
      pendingMessage.message,
    ]

    OpenAI.createChatCompletion({
      model: this.model,
      messages: requestMessages,
      // todo: improve. https://platform.openai.com/docs/api-reference/completions/create > Completions > Request Body
      // todo: select the best model for different cases: https://platform.openai.com/account/rate-limits
    })
    .then( response =>
    {
      const assistantMessage = this.extractAPIRequestAssistantMessage( response )
      pendingMessage.onSent( assistantMessage.content )
    })
    .catch( error =>
    {
      console.error( error )

      // todo: handle
      throw new Error( 'Something goes wrong!' )
    })
    .finally(() =>
    {
      this.isPerformingAPIRequest = false
      this.lastAPIResponseTime = Date.now()

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