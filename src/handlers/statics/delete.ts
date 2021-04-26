import { RequestHandler } from 'express'
import { getBridgeEntitySchemas as schemas } from '../../helpers/getBridgeEntitySchemas'

import { Bridge } from '../../typings/bridge'

type Any = { [key: string]: any }
type DeleteQuery = Bridge.Helpers.Criteria<Any>
type SoftDeleteQuery = DeleteQuery

const _delete: RequestHandler<unknown, unknown, unknown, DeleteQuery> = async ( req, res, next ) => {
  schemas.criteria( req.bridge )
    .then( schema => schema.validate( req.query ) )
    .then( query => req.bridge.delete( query ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

const softDelete: RequestHandler<unknown, unknown, unknown, SoftDeleteQuery> = ( req, res, next ) => {
  schemas.criteria( req.bridge )
    .then( schema => schema.validate( req.query ) )
    .then( query => req.bridge.softDelete( query ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

/*
deleteRoute.delete( paths( 'delete', '/' ), handler( _delete, 'delete' ) )
deleteRoute.delete( paths( softDelete.name, 'soft' ), handler( softDelete ) )
*/

export { _delete as delete, softDelete }
