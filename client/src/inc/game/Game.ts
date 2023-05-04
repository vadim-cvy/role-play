import { ref } from "vue"
import type iGameMeta from "./iGameMeta"
import GameMainChat from "./GameMainChat"
import Location from "./Location"

class Game
{
  constructor()
  {
    this.chat.init().then( () => this.syncMeta() )
  }

  public readonly chat = GameMainChat

  public readonly time = ref( '' )

  public readonly date = ref( '' )

  public readonly location = Location

  public readonly turnDescription = ref( '' )

  public doUserAction( action: string )
  {
    this.turnDescription.value = ''

    const message =
      `Character action:
      ${action}`

    this.chat.sendMessageSave( message ).then( () => this.syncMeta() )
  }

  protected syncMeta()
  {
    const message =
      `I have a JSON formatted meta data. But it may be outdated as I haven't synced it with the last action of my character and your last response. May you update JSON values if ones are outdated? Don't update or change data which is still actual.

      You MUST respond to me with a JSON string as I will apply javascript JSON.parse to your message. Nothing more. Don't ask any questions, don't say something which is not JSON string. Don't change, add or remove JSON data keys. Keys MUST leave the same!

      JSON structure:
      * "time" (string) - game time. Use the following format: "HH:MM".
      * "date" (string) - game date. Use the following format: "Nth Month YYYY".
      * "locationLabel" (string) - current location. Should include country and town name. Street name and house number should be included if possible. Sub loaction should be included if necessary. Example of sub location: "kitchen" (for someone's home), etc.

      JSON data itself: ${JSON.stringify({
        time: this.time.value,
        date: this.date.value,
        locationLabel: this.location.label.value
      } as iGameMeta)}`

    this.turnDescription.value = this.chat.history[ this.chat.history.length - 1 ].content

    this.chat.sendMessage( message ).then( jsonData =>
    {
      const data = JSON.parse( jsonData ) as iGameMeta

      // This is designed to validate unexpected data keys in the chat response.
      for ( const key in data )
      {
        switch ( key )
        {
          case 'date':
            this.date.value = data.date
            break

          case 'time':
            this.time.value = data.time
            break

          case 'locationLabel':
            this.location.updateLabel( data.locationLabel )
            break

          default:
            throw new Error( `Unexpected game meta key "${key}"!` )
        }
      }
    })
  }
}

export default new Game()