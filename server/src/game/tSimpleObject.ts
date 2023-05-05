import { tSimpleProp } from "./tSimpleProp"

export type tSimpleObject =
{
  [key: string]: tSimpleProp | tSimpleObject
}