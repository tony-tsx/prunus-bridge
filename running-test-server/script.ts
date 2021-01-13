import getConnection from '../src/helpers/get-connection'
import User from './bridges/User'

getConnection()
  .then( async conn => {
    console.log( User )
    conn.close()
  } )
