import getConnection from '../src/helpers/get-connection'
import User from './bridges/User'

getConnection()
  .then( async conn => {
    await User.clear()
    // const repo = getRepository( UserEntity )
    const data = {
      firstName: 'Tony',
      lastName: 'Tea',
      email: 'tony.js@zoho.eu',
      birthDate: new Date()
    }
    const user = await User( data ).save()
    // const user = await repo.save( Object.assign( new UserEntity(), data ) )
    console.log( user )
    conn.close()
  } )
