import cors from 'cors'
import Express from 'express'
import { createConnection } from 'typeorm'

import TypeORMBridge from '../dist'
import User from './bridges/User'

const app = Express()
app.use( cors() )
app.use( TypeORMBridge.router( User ) )

createConnection( require( '../ormconfig.json' ) )
  .then( () => {
    app.listen( 8080, () => {
      console.log( `> dev server start at ${new Date().toLocaleString()}` )
      console.log( '> dev server running in localhost:8080' )
    } )
  } )
