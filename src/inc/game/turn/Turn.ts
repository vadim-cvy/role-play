import { ref } from "vue"
import type iTurnMeta from "./iTurnMeta"
import TurnChat from "./TurnChat"

export default class Turn
{
  constructor()
  {
    TurnChat.init().then( () => this.syncData() )
  }

  protected chat = TurnChat

  public readonly meta = ref<iTurnMeta | null>( null )

  public readonly description = ref( '' )

  public doAction( action: string )
  {
    this.description.value = ''

    const message =
      `Character action:
      ${action}`

    this.chat.sendUserMessageSave( message ).then( () => this.syncData() )
  }

  protected syncData()
  {
    const message =
      `I have a JSON formatted meta data. But it may be outdated as I haven't synced it with the last action of my character and your last response. May you update JSON values if ones are outdated? Don't update or change data which is still actual.

      You MUST respond to me with a JSON string as I will apply javascript JSON.parse to your message. Nothing more. Don't ask any questions, don't say something which is not JSON string. Don't change, add or remove JSON data keys. Keys MUST leave the same!

      JSON structure:
      * "time" (string) - game time. Use the following format: "HH:MM".
      * "date" (string) - game date. Use the following format: "Nth Month YYYY".
      * "location" (string) - current location. Should include country and town name. Street name and house number should be included if possible. Sub loaction should be included if necessary. Example of sub location: "kitchen" (for someone's home), etc.

      JSON data itself: ${JSON.stringify( this.meta.value )}`

    this.description.value = this.chat.history[ this.chat.history.length - 1 ].content

    this.chat.sendUserMessage( message ).then( response =>
      this.meta.value = JSON.parse( response ) as iTurnMeta
    )
  }
}