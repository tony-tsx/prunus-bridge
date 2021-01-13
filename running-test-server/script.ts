import getConnection from '../src/helpers/get-connection'
import User from './bridges/User'

getConnection()
  .then( async conn => {
    const one = await User.findOne( { where: { firstName: 'Antony' } } )
    const data = JSON.parse( JSON.stringify( one ) )
    data.firstName = 'Tony'
    const user = User( data )
    console.log( await user.save() )
    console.log( user )
    conn.close()
  } )
