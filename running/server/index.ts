import bodyParser from 'body-parser'
import cors from 'cors'
import Express from 'express'
import { createConnection } from 'typeorm'

import TypeORMBridge from '../../src'
import '../common/bridges/User'

const app = Express()

app.use( bodyParser.json() )
app.use( cors() )
app.use( TypeORMBridge.handler() )

createConnection( require( '../../ormconfig.json' ) )
  .then( () => {
    const port = 8085 
    app.listen( port, () => {
      console.log( `> dev server start at ${new Date().toLocaleString()}` )
      console.log( `> dev server running in http://localhost:${port}` )
    } )
  } )
