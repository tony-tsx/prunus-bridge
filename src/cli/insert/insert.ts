import { Command } from 'commander'

import getConnection from '../../helpers/get-connection'
import Bridge from '../../types/bridge'
import parserUnknownOption from '../helpers/parser-unknown-option'

const insert = ( bridge: Bridge<any> ) => {
  const insert = new Command( 'insert' )

  insert.alias( 'i' )

  insert.allowUnknownOption()

  insert.action( async ( cmd: Command, options: string[] ) => {

    const data = parserUnknownOption( options )
    const connection = await getConnection()
    const repo = await bridge.getRepo()
    const keyName = repo.metadata.primaryColumns[0].propertyName

    await bridge.insert( data )
      .then( result => {

        console.log( 'identifiers:' )
        result.identifiers.forEach( ( identifier ) => {
          console.log( `  ${identifier[keyName]}` )
        } )

        console.log( '\ngenerated: [' )
        result.generatedMaps.forEach( generatedMap => {
          console.log( '  {' )
          Object.entries( generatedMap ).forEach( ( [ key, value ] ) => {
            console.log( `    ${key}: ${value}` )
          } )
          console.log( '  }' )
        } )
        console.log( ']' )
      } )

    connection.close()
  } )

  return insert
}

export default insert
