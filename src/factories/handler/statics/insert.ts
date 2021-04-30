import { getBridgeEntitySchemas as schemas } from '../../../helpers/getBridgeEntitySchemas'
import { AnyBridge } from '../../../typings/bridge'
import { RouteOptions } from '../../../typings/route-options'
import { find, findOneOrFail } from './find'

const insert = ( bridge: AnyBridge, query: any, body: any, params: any, options: RouteOptions ) =>
  schemas.insert( bridge )
    .then( schema => schema.validate( body ) )
    .then( () => bridge.insert( body ) )

const insertOne = ( bridge: AnyBridge, query: any, body: any, params: any, options: RouteOptions ) =>
  schemas.insertOne( bridge )
    .then( schema => schema.validate( body ) )
    .then( () => bridge.insertOne( body ) )

const insertAndFind = ( bridge: AnyBridge, query: any, body: any, params: any, options: RouteOptions ) =>
  insert( bridge, query, body, params, options )
    .then( identifiers => {
      const findQuery = { ...query, where: identifiers }
      return find( bridge, findQuery, body, params, options )
    } )

const insertOneAndFind = ( bridge: AnyBridge, query: any, body: any, params: any, options: RouteOptions ) =>
  insertOne( bridge, query, body, params, options )
    .then( identifiers => {
      const findOneOrFailQuery = { idOrOptionsOrConditions: identifiers, options: query }
      return findOneOrFail( bridge, findOneOrFailQuery, body, identifiers, options )
    } )

export { insert, insertOne, insertAndFind, insertOneAndFind }
