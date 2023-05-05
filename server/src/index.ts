import Koa = require( 'koa' )
import Router = require( 'koa-router' )
import bodyParser = require( 'koa-bodyparser' )
import cors = require( '@koa/cors' )
import Game from './game/Game'

const
  server = new Koa(),
  router = new Router(),
  port = 3001

server.use( cors() )
server.use( bodyParser() )
server.use( router.routes() )
server.use( router.allowedMethods() );

(async () =>
{
  const game = await Game.getInstance()

  // todo: add id. currently it just returns the same for any request
  router.get( '/api/saving-slot/', ctx => ctx.body = JSON.stringify( game.frontendData ) )

  // router.post( '/api/user-action/', ctx =>
  // {
  //   // game.doUserAction( action )

  //   // todo: return updated game data?
  //   ctx.body = JSON.stringify( game.frontendData )
  // })

  server.listen( port, () => console.log( `Server is running at http://localhost:${port}` ) )
})()
