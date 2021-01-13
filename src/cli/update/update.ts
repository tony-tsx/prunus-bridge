import { Command } from 'commander'

import getConnection from '../../helpers/get-connection'
import Bridge from '../../types/bridge'
import parserCriteria from '../helpers/parser-criteria'

const update = ( bridge: Bridge<any> ) => {
  const update = new Command( 'update' )

  update.alias( 'u' )

  update.option( '-w, --where <command | predicate>', '', parserCriteria )
  update.option( '--transaction', '', false )
  update.option( '-f, --field <field and value>', '', ( value, previous ) => {
    const [ f, v ] = value.split( '=' ).map( v => v.trim() )
    return { ...previous, [f]: v }
  }, {} )

  update.action( async () => {
    const opts = update.opts()
    const connection = await getConnection()

    await bridge.update( opts.where, opts.field )
      .then( result => {
        if ( result.generatedMaps.length ) {
          console.log( 'Generated Maps: {' )
          result.generatedMaps.forEach( generatedMap => {
            Object.entries( generatedMap ).forEach( ( [ key, value ] ) => {
              console.log( `${key}: ${value}` )
            } )
          } )
          console.log( '}' )
        }
        if ( result.raw ) console.log( `Raw: ${result.raw}` )
        console.log( `Affected: ${result.affected}` )
      } )

    connection.close()
  } )

  return update
}

export default update
