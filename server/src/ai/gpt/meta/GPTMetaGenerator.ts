import { tSimpleObject } from "../../../game/tSimpleObject";
import GPT from "../GPT"
import { tGPTMetaObject } from "./tGPTMetaObject";

export default class GPTMetaGenerator
{
  constructor(
    protected readonly gpt: GPT
  ) {}

  // todo: this should be populated by (another?) gpt on createInstance()
  protected readonly meta: tGPTMetaObject = {
    // todo: move to plot metagenerator
    time: {
      format: 'yyyy-mm-dd hh:mm:ss',
      purpose: 'Represents ingame date and time.',
      value: '',
    },
  }

  public get values()
  {
    return this.getMetaObjectValue( this.meta )
  }

  protected getMetaObjectValue( obj: tGPTMetaObject )
  {
    const value: tSimpleObject = {}

    for ( const key in obj )
    {
      let subObjValue = obj[ key ].value

      if ( Array.isArray( subObjValue ) )
      {
        // todo: validate array does not contain anything except strings and numbers
        value[ key ] = subObjValue.map( String )
      }
      else if ( typeof subObjValue === 'object' )
      {
        value[ key ] = this.getMetaObjectValue( subObjValue )
      }
      else if ( typeof subObjValue !== 'object' )
      {
        value[ key ] = subObjValue
      }
    }

    return value
  }

  public async sync()
  {
    if ( ! Object.keys( this.meta ).length )
    {
      return
    }

    // todo: this message should be dynamic for different game modules. Maybe extend generator and create custom class. Or maybe just pass the prompt.
    // todo: maybe insert typescript tGPTMetaObject.ts file content here to make structure more understandable for GPT model
    return this.gpt.sendMessage(`
      Now I need to syncronize game meta data I keep track of. I have syncronized that data after your previous response and there are 2 messages added since that time: my and your. So some values may be outdated and need to be updated.

      Data is JSON formatted. Each object in the JSON has from 2 to 3 params.
      'value' param: it holds the value of the object. This is what you gonna update (if value is outdated);
      'purpose' param: it can help you understand what 'value' param represents and what it is needed for. You must not update this param;
      'format' param: it holds the format you must consider when you're updating the 'value' param. You must not update this param.

      The data (json): ${JSON.stringify( this.meta )}

      I will apply JSON.parse JS function to your response so you MUST respond to me with a valid JSON string. Nothing more, just valid JSON string.`
    )
    // todo: check is validjson, no keys removed/added
    .then( json => JSON.parse( json ) )
  }
}