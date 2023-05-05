import GameModule from "../GameModule";
import ScenarioGPT from "./ScenarioGPT";

export default class GlobalGameModule extends GameModule
{
  static async getInstance()
  {
    if ( ! this.instance )
    {
      this.instance = new this({
        scenario: await ScenarioGPT.getInstance()
      })
    }

    return this.instance
  }

  protected constructor(
    GPTs: {
      scenario: ScenarioGPT
    }
  )
  {
    super( GPTs )

    this.syncTurnDescription()
  }

  protected turnDescription = ''

  public get frontendData()
  {
    const data = super.frontendData

    data.turnDescription = this.turnDescription

    return data
  }

  protected syncTurnDescription()
  {
    const scenarioHistory = this.GPTs.scenario.history

    this.turnDescription = scenarioHistory[ scenarioHistory.length - 1 ].content
  }
}