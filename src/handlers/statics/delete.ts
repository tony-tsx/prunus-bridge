import { RequestHandler } from 'express'

import { Bridge } from '../../typings/bridge'

type Any = { [key: string]: any }
type DeleteQuery = Bridge.Helpers.Criteria<Any>
type SoftDeleteQuery = DeleteQuery

const _delete: RequestHandler<unknown, unknown, unknown, DeleteQuery> = ( req, res, next ) => {
  req.bridge.delete( req.query )
    .then( res.json.bind( res ) )
    .catch( next )
}

const softDelete: RequestHandler<unknown, unknown, unknown, SoftDeleteQuery> = ( req, res, next ) => {
  req.bridge.softDelete( req.query )
    .then( res.json.bind( res ) )
    .catch( next )
}

/*
deleteRoute.delete( paths( 'delete', '/' ), handler( _delete, 'delete' ) )
deleteRoute.delete( paths( softDelete.name, 'soft' ), handler( softDelete ) )
*/

export { _delete as delete, softDelete }
