import Koa = require( 'koa' )
import Router = require( 'koa-router' )
import bodyParser = require( 'koa-bodyparser' )
import cors = require( '@koa/cors' )
import database from './database'

const
  server = new Koa(),
  router = new Router(),
  port = 3001

server.use( cors() )
server.use( bodyParser() )
server.use( router.routes() )
server.use( router.allowedMethods() )

router.get( '/api/test/', ctx => ctx.body = 'test' )

server.listen( port, () => console.log( `Server is running at http://localhost:${port}` ) )