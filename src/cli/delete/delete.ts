import { Command } from 'commander'

import getConnection from '../../helpers/get-connection'
import Bridge from '../../types/bridge'
import parserCriteria from '../helpers/parser-criteria'
import reduceUuidv4 from '../helpers/reduce-uuidv4'

const _delete = ( bridge: Bridge<any> ) => {
  const _delete = new Command( 'delete' )

  _delete.alias( 'd' )
  _delete.arguments( '[id]' )

  _delete.option( '-w, --where <command | predicate>', '', parserCriteria )
  _delete.option( '--transaction', '', false )
  _delete.option( '-f, --field <field and value>', '', ( value, previous ) => {
    const [ f, v ] = value.split( '=' ).map( v => v.trim() )
    return { ...previous, [f]: v }
  }, {} )

  _delete.action( async ( id ) => {
    const opts = _delete.opts()
    const connection = await getConnection()
    const repo = await bridge.getRepo()
    const keyName = repo.metadata.primaryColumns[0].propertyName
    if ( id )
      ( opts.where ??= {} )[keyName] = reduceUuidv4.isReduced( id )
        ? bridge.op.raw( `"${keyName}" AND "${keyName}"::text LIKE '%${id}%'` )
        : id

    await bridge.delete( opts.where )
      .then( result => {
        console.log( `delete count: ${result.affected}` )
      } )

    connection.close()
  } )

  return _delete
}

export default _delete
