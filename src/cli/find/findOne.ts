import { Command } from 'commander'

import getConnection from '../../helpers/get-connection'
import { AnyBridge } from '../../types/bridge'
import parserArray from '../helpers/parser-array'
import parserFindOrder from '../helpers/parser-find-order'
import parserWhere from '../helpers/parser-where'
import reduceUuidv4 from '../helpers/reduce-uuidv4'

const findOne = ( bridge: AnyBridge ) => {
  const findOne = new Command( 'one' )

  findOne.arguments( '[id]' )

  findOne.alias( 'o' )

  findOne.option<string[]>( '-f, --select <name>', 'add field to output', parserArray )
  findOne.option( '-t, --take <qty>' )
  findOne.option( '-s, --skip <qty>' )
  findOne.option<any>( '-o, --order <field ASC | DESC | 1 | -1>', '', parserFindOrder, {} )
  findOne.option<string[]>( '-r, --relation <relation>', '', parserArray, [] )
  findOne.option( '-w, --where <command | predicate>', '', parserWhere )
  findOne.option( '--with-deleted', '', false )
  findOne.option( '--transaction', '', false )

  findOne.action( async ( id: string ) => {
    const opts = findOne.opts()
    const connection = await getConnection()
    const repo = await bridge.getRepo()
    const keyName = repo.metadata.primaryColumns[0].propertyName
    const isUuidv4Reduced = id && reduceUuidv4.isReduced( id )

    if ( isUuidv4Reduced ) ( opts.where ??= [] ).push( {
      [keyName]: bridge.op.raw( `"${bridge.name}"."${keyName}" AND "${bridge.name}"."${keyName}"::text LIKE '%${id}%'` )
    } )

    await ( isUuidv4Reduced ? bridge.findOne( undefined, opts ) : bridge.findOne( id, opts ) )
      .then( entity => {
        Object.entries( entity ).forEach( ( [ key, value ] ) => {
          console.log( `${key}: ${value}` )
        } )
      } )

    connection.close()
  } )

  return findOne
}

export default findOne
