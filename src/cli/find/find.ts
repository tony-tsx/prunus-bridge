import { Command } from 'commander'

import getConnection from '../../helpers/get-connection'
import { omit } from '../../helpers/object'
import { AnyBridge } from '../../types/bridge'
import { AnyBridgeInstance } from '../../types/bridge-instance'
import parserArray from '../helpers/parser-array'
import parserFindOrder from '../helpers/parser-find-order'
import parserWhere from '../helpers/parser-where'
import reduceUuidv4 from '../helpers/reduce-uuidv4'
import findByIds from './findByIds'
import findOne from './findOne'

const find = ( bridge: AnyBridge ) => {
  const find = new Command( 'find' )

  find.alias( 'f' )

  find.option<string[]>( '-f, --select <name>', 'add field to output', parserArray )
  find.option( '-t, --take <qty>' )
  find.option( '-s, --skip <qty>' )
  find.option<any>( '-o, --order <field ASC | DESC | 1 | -1>', '', parserFindOrder, {} )
  find.option<string[]>( '-r, --relation <relation>', '', parserArray, [] )
  find.option( '-w, --where <command | predicate>', '', parserWhere )
  find.option( '--with-deleted', '', false )
  find.option( '--transaction', '', false )

  find.action( async () => {
    const opts = find.opts()
    const connection = await getConnection()
    const repo = await bridge.getRepo()
    const keyName = repo.metadata.primaryColumns[0].propertyName as keyof AnyBridgeInstance

    await bridge.find( opts )
      .then( entities => {
        const possibleReduce = entities.every( entity => !!entity[keyName] )
        if ( !possibleReduce ) return entities
        const builder = reduceUuidv4.keyBuilder( entities.map( entity => entity[keyName] ) )
        return entities.reduce(
          ( group, entity ) => ( { ...group, [builder( entity[keyName] )]: omit( entity, keyName ) } ),
          {}
        )
      } )
      .then( entities => {
        console.table( entities )
      } )

    connection.close()
  } )

  find.addCommand( findOne( bridge ) )
  find.addCommand( findByIds( bridge ) )

  return find
}

export default find
