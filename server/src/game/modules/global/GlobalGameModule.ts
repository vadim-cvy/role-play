import GameModule from "../GameModule";
import PlotGPT from "./PlotGPT";

export default class GlobalGameModule extends GameModule
{
  static async getInstance()
  {
    if ( ! this.instance )
    {
      this.instance = new this({
        plot: await PlotGPT.getInstance()
      })
    }

    return this.instance
  }

  protected constructor(
    GPTs: {
      plot: PlotGPT
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
    const plotHistory = this.GPTs.plot.history

    this.turnDescription = plotHistory[ plotHistory.length - 1 ].content
  }
}