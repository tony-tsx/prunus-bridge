import { RequestHandler } from 'express'
import { FindConditions, FindManyOptions } from 'typeorm'
import { getBridgeEntitySchemas as schemas } from '../../helpers/getBridgeEntitySchemas'

import { parseQueryRecursive as parse } from '../../helpers/parseQueryRecursive'

type Any = { [key: string]: any }
type CountQuery = FindManyOptions<Any> | FindConditions<Any>
type IncrementQuery = { conditions: FindConditions<Any>, propertyPath: string, value: number | string }
type DecrementQuery = IncrementQuery

const clear: RequestHandler = ( req, res, next ) => {
  req.bridge.clear()
    .then( res.json.bind( res ) )
    .catch( next )
}

const count: RequestHandler<unknown, unknown, unknown, CountQuery> = ( req, res, next ) => {
  schemas.findManyConditionsOrOptions( req.bridge )
    .then( schema => schema.validate( parse( req.query ) ) )
    .then( options => req.bridge.count( options ) )
    .then( res.json.bind( res ) )
    .catch( next )
}
const increment: RequestHandler<unknown, unknown, unknown, IncrementQuery> = ( req, res, next ) => {
  schemas.findConditions( req.bridge )
    .then( schema => schema.validate( parse( req.query.conditions ) ) )
    .then( conditions => req.bridge.decrement(
      conditions as FindConditions<any>,
      parse( req.query.propertyPath ),
      parse( req.query.value )
    ) )
    .then( res.json.bind( res ) )
    .catch( next )
}
const decrement: RequestHandler<unknown, unknown, unknown, DecrementQuery> = ( req, res, next ) => {
  schemas.findConditions( req.bridge )
    .then( schema => schema.validate( parse( req.query.conditions ) ) )
    .then( conditions => req.bridge.increment(
      conditions as FindConditions<any>,
      parse( req.query.propertyPath ),
      parse( req.query.value )
    ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

/*
toolsRoute.get( paths( count.name ), handler( count ) )
toolsRoute.delete( paths( clear.name ), handler( clear ) )
toolsRoute.patch( paths( increment.name ), handler( increment ) )
toolsRoute.patch( paths( decrement.name ), handler( decrement ) )
*/

export { count, clear, increment, decrement }
