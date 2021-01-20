import { PathLike } from 'fs'

import { _require } from './_import'
import getTypeORM from './get-typeorm'
import isClientSide from './is-client-side'

type fs = typeof import( 'fs' )
type fsPromise = typeof import( 'fs/promises' )
type path = typeof import( 'path' )

const files = [
  !isClientSide() && process.env.TYPEORM_CONFIG,
  'ormconfig.json',
  'ormconfig.ts',
  'ormconfig.js' 
].filter( Boolean )

if ( !isClientSide() )
  files.push(
    ...files.map( file => _require<path>( 'path' ).join( 'dist', file ) ),
    ...files.map( file => _require<path>( 'path' ).join( 'src', file ) )
  )

const checkIfExists = ( path: PathLike ) => {
  const fs = _require<fsPromise>( 'fs/promises' )
  return fs.stat( path )
    .then( () => true, () => false )
}

const load = ( file: string ) => {
  const module = _require( file )
  if ( module.default ) return module.default
  return module
}

const getConnection = async ( connectionName?: string ) => {
  try {
    const TypeORM = await getTypeORM()
    try {
      const connection = TypeORM.getConnection( connectionName )
      return connection
    } catch ( e ) {
      const { resolve } = _require<path>( 'path' )

      for await ( const file of files ) {
        const fullpath = resolve( file )
        const exists = await checkIfExists( resolve( file ) )
        if ( exists ) return TypeORM.createConnection( load( fullpath ) )
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

      for ( const file of files ) {
        const fullpath = resolve( file )
        if (
          fs.existsSync( resolve( file ) )
        ) return TypeORM.createConnection( load( fullpath ) )
      }
      throw new Error( '' )
    }
  } catch ( e ) { throw e }
}

export default getConnection
