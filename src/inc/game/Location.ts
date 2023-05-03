import { ref } from "vue"
import OpenAI from "../ai/OpenAI"
import Game from "./Game"

class Location
{
  protected _label = ref( '' )

  public get label()
  {
    return this._label
  }

  protected _img = ref( '' )

  public get img()
  {
    return this._img
  }

  public updateLabel( newLabel: string )
  {
    const oldLabel = this._label.value

    this._label.value = newLabel

    if ( oldLabel !== newLabel )
    {
      this.syncImg()
    }
  }

  protected syncImg()
  {
    this._img.value =
      `https://via.placeholder.com/600x400?text=Location: ${this.label.value ? this.label.value : 'loading...'}`

    // todo: commented out to save $ on API requsts
    // Game.chat.sendMessage(
    //   `Provide me with the current location description which I'll use to generate the image with AI tool (DALL-E). I want picture to look like a screenshot from the PC game.

    //   It is important to keep your message under 50 words.`
    // )
    // .then( locationDescription =>
    // {
    //   OpenAI.createImage({
    //     prompt: locationDescription,
    //     n: 1,
    //     size: "1024x1024",
    //   })
    //   .then( response => this.img.value = response.data.data[0].url || '' )
    // })
  }
}

export default new Location()