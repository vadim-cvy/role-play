import GPT from "../../ai/gpt/GPT"
import iHasFrontendData from "../iHasFrontendData"
import { tSimpleObject } from "../tSimpleObject"

export default abstract class GameModule implements iHasFrontendData
{
  protected static instance?: GameModule

  static async getInstance() : Promise<GameModule>
  {
    throw new Error( 'This method is abstract and must be implemented!' )
  }

  protected constructor(
    protected readonly GPTs: {
      [key: string]: GPT
    }
  ) {}

  public get frontendData()
  {
    let data: tSimpleObject = {}

    // todo: validate there are no same keys
    Object.values( this.GPTs ).forEach( gpt => data = {
      ...data,
      ...gpt.metaGenerator.values
    })

    return data
  }
}