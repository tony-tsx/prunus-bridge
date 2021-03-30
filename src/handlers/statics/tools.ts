import { RequestHandler } from 'express'
import { FindConditions, FindManyOptions } from 'typeorm'

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
  req.bridge.count( parse( req.query ) )
    .then( res.json.bind( res ) )
    .catch( next )
}
const increment: RequestHandler<unknown, unknown, unknown, IncrementQuery> = ( req, res, next ) => {
  req.bridge.increment( parse( req.query.conditions ), parse( req.query.propertyPath ), parse( req.query.value ) )
    .then( res.json.bind( res ) )
    .catch( next )
}
const decrement: RequestHandler<unknown, unknown, unknown, DecrementQuery> = ( req, res, next ) => {
  req.bridge.increment( parse( req.query.conditions ), parse( req.query.propertyPath ), parse( req.query.value ) )
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
