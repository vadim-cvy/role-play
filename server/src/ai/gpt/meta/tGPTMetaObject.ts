import { tSimpleProp } from "../../../game/tSimpleProp"

export type tGPTMetaObjectValue = tSimpleProp | tGPTMetaObject

export type tGPTMetaObject =
{
  [key: string]: {
    value: tGPTMetaObjectValue
    purpose: string
    format?: string
  }
}

// todo: use this to check if returned response by chat gpt is valid
export function isGPTMetaObject( val: any ) : val is tGPTMetaObject
{
  if ( typeof val !== 'object' )
  {
    return false
  }

  const keys = Object.keys( val )

  if ( keys.length < 2 || keys.length > 3 )
  {
    return false
  }

  const unrecognizedKeys = keys.filter( key => ! [ 'value', 'purpose', 'format' ].includes( key ) )

  if ( unrecognizedKeys.length )
  {
    return false
  }

  return true
}