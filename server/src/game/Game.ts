import iHasFrontendData from "./iHasFrontendData"
import GameModule from "./modules/GameModule"
import GlobalGameModule from "./modules/global/GlobalGameModule"
import { tSimpleObject } from "./tSimpleObject"

export default class Game implements iHasFrontendData
{
  protected static instance?: Game

  static async getInstance()
  {
    if ( ! this.instance )
    {
      this.instance = new this({
        global: await GlobalGameModule.getInstance(),
      })
    }

    return this.instance
  }

  protected constructor(
    protected modules: {
      [key: string]: GameModule
    }
  ) {}

  public get frontendData()
  {
    const data: tSimpleObject = {}

    for ( const key in this.modules )
    {
      data[ key ] = this.modules[ key ].frontendData
    }

    return data
  }









  // protected readonly location = new Location()

  // // todo: to character
  // public doUserAction( action: string )
  // {
  //   this.turnDescription = ''

  //   const message =
  //     `Character action:
  //     ${action}`

  //   plotChat.sendMessageSave( message ).then( () => this.syncMeta() )
  // }
}