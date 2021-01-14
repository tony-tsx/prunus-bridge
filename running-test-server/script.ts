import { getRepository } from 'typeorm'

import getConnection from '../src/helpers/get-connection'
import User from './bridges/User'
import { User as UserEntity } from './entities/User'

getConnection()
  .then( async conn => {
    await User.clear()
    const repo = getRepository( UserEntity )
    const data = {
      firstName: 'Tony',
      lastName: 'Tea',
      email: 'tony.js@zoho.eu',
      birthDate: new Date()
    }
    const user = await User.insertOne( data )
    // const user = await repo.insert( Object.assign( new UserEntity(), data ) )
    // const user = await repo.insert( data )
    console.log( user )
    conn.close()
  } )
