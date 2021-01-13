import { Command } from 'commander'

import getConnection from '../../helpers/get-connection'
import { AnyBridge } from '../../types/bridge'
import parserArray from '../helpers/parser-array'
import parserFindOrder from '../helpers/parser-find-order'
import parserWhere from '../helpers/parser-where'
import reduceUuidv4 from '../helpers/reduce-uuidv4'

const findByIds = ( bridge: AnyBridge ) => {
  const findByIds = new Command( 'by-ids' )

  findByIds.aliases( [ 'ids', 'i' ] )

  findByIds.arguments( '<id> [...ids]' )

  findByIds.option<string[]>( '-s, --select <name>', 'add field to output', parserArray )
  findByIds.option( '-t, --take <qty>' )
  findByIds.option( '-s, --skip <qty>' )
  findByIds.option<any>( '-o, --order <field ASC | DESC | 1 | -1>', '', parserFindOrder, {} )
  findByIds.option<string[]>( '-r, --relation <relation>', '', parserArray, [] )
  findByIds.option( '-w, --where <command | predicate>', '', parserWhere )
  findByIds.option( '--with-deleted', '', false )
  findByIds.option( '--transaction', '', false )

  findByIds.action( async ( ...ids: string[] ) => {
    ids.pop()
    ids = ids.filter( Boolean )
    const opts = findByIds.opts()
    const connection = await getConnection()
    const repo = await bridge.getRepo()
    const keyName = repo.metadata.primaryColumns[0].propertyName
    const fields = opts.select?.length
      ? opts.select
      : repo.metadata.columns.map( column => column.propertyName ).filter( column => column !== keyName )

    const hasReduced = ids.some( id => reduceUuidv4.isReduced( id ) )

    if ( hasReduced ) ids.forEach( id => {
      if ( reduceUuidv4.isReduced( id ) )
        ( opts.where ??= [] ).push( {
          [keyName]: bridge.op.raw( `"${bridge.name}"."${keyName}" AND "${bridge.name}"."${keyName}"::text LIKE '%${id}%'` )
        } )
      else ( opts.where ??= [] ).push( { [keyName]: id } )
    } )

    await ( hasReduced ? bridge.find( opts ) : bridge.findByIds( ids, opts ) )
      .then( entities => {
        const builder = reduceUuidv4.keyBuilder( entities.map( entity => entity[keyName] ) )
        return entities.reduce( ( group, entity ) => ( {
          ...group,
          [builder( entity[keyName] )]: entity
        } ), {} )
      } )
      .then( entities => console.table( entities, fields ) )

    connection.close()
  } )

  return findByIds
}

export default findByIds
