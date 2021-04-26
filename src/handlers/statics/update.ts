import { RequestHandler } from 'express'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { getBridgeEntitySchemas as schemas } from '../../helpers/getBridgeEntitySchemas'

import { Bridge } from '../../typings/bridge'

type Any = { [key: string]: any }
type UpdateBody = QueryDeepPartialEntity<Any>
type UpdateQuery = Bridge.Helpers.Criteria<Any>
type SoftUpdateQuery = UpdateQuery

const update: RequestHandler<unknown, unknown, UpdateBody, UpdateQuery> = ( req, res, next ) => {
  Promise.all( [ schemas.criteria( req.bridge ), schemas.update( req.bridge ) ] )
    .then( ( [ criteriaSchema, updateSchema ] ) => Promise.all( [
      criteriaSchema.validate( req.query ),
      updateSchema.validate( req.body )
    ] ) )
    .then( ( [ criteria, update ] ) => req.bridge.update( criteria, update as any ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

const restore: RequestHandler<unknown, unknown, unknown, SoftUpdateQuery> = ( req, res, next ) => {
  schemas.criteria( req.bridge )
    .then( schema => schema.validate( req.query ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

/*
updateRoute.patch( paths( update.name, '/' ), handler( update ) )
updateRoute.patch( paths( restore.name ), handler( restore ) )
*/

export { update, restore }
