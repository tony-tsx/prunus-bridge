import { RequestHandler } from 'express'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { Bridge } from '../../typings/bridge'

type Any = { [key: string]: any }
type UpdateBody = QueryDeepPartialEntity<Any>
type UpdateQuery = Bridge.Helpers.Criteria<Any>
type SoftUpdateQuery = UpdateQuery

const update: RequestHandler<unknown, unknown, UpdateBody, UpdateQuery> = ( req, res, next ) => {
  req.bridge.update( req.query, req.body )
    .then( res.json.bind( res ) )
    .catch( next )
}

const restore: RequestHandler<unknown, unknown, unknown, SoftUpdateQuery> = ( req, res, next ) => {
  req.bridge.restore( req.query )
    .then( res.json.bind( res ) )
    .catch( next )
}

/*
updateRoute.patch( paths( update.name, '/' ), handler( update ) )
updateRoute.patch( paths( restore.name ), handler( restore ) )
*/

export { update, restore }
