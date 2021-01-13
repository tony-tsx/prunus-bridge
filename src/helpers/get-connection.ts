import { PathLike } from 'fs'

import { _require } from './_import'
import getTypeORM from './get-typeorm'

type fs = typeof import( 'fs' )
type fsPromise = typeof import( 'fs/promises' )
type path = typeof import( 'path' )


const checkIfExists = ( path: PathLike ) => {
  const fs = _require<fsPromise>( 'fs/promises' )
  return fs.stat( path )
    .then( () => true, () => false )
}

const getConnection = async ( connectionName?: string ) => {
  try {
    const TypeORM = await getTypeORM()
    try {
      const connection = TypeORM.getConnection( connectionName )
      return connection
    } catch ( e ) {
      const { resolve } = _require<path>( 'path' )

      const files = [ 'ormconfig.json', 'ormconfig.ts' ]
      for await ( const file of files ) {
        const fullpath = resolve( file )
        const exists = await checkIfExists( resolve( file ) )
        if ( exists ) return TypeORM.createConnection( require( fullpath ) )
      }
      throw new Error( '' )
    }
  } catch ( e ) { return Promise.reject( e ) }
}

getConnection.sync = ( connectionName?: string ) => {
  try {
    const TypeORM = getTypeORM.sync()
    try {
      const connection = TypeORM.getConnection( connectionName )
      return connection
    } catch ( e ) {
      const fs = _require<fs>( 'fs' )
      const { resolve } = _require<path>( 'path' )

      const files = [ 'ormconfig.json', 'ormconfig.ts', 'ormconfig.js' ]
      for ( const file of files ) {
        const fullpath = resolve( file )
        if (
          fs.existsSync( resolve( file ) )
        ) return TypeORM.createConnection( require( fullpath ) )
      }
      throw new Error( '' )
    }
  } catch ( e ) { throw e }
}

export default getConnection
