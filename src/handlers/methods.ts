import { RequestHandler } from 'express'
import { RemoveOptions, SaveOptions } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { getDefaultRouteOptions as option } from '../helpers/getDefaultRouteOptions'
import { parseQueryRecursive as parse } from '../helpers/parseQueryRecursive'

type Any = { [key: string]: any }
type CommonBody = QueryDeepPartialEntity<Any>
type SaveBody = CommonBody
type SaveQuery = SaveOptions
type RecoverBody = CommonBody
type RecoverQuery = SaveOptions
type RemoveBody = CommonBody
type RemoveQuery = RemoveOptions
type SoftRemoveBody = CommonBody
type SoftRemoveQuery = RemoveOptions

const save: RequestHandler<unknown, unknown, SaveBody, SaveQuery> = ( req, res, next ) => {
  const query = parse( req.query )
  const defaultOption = option( req.bridge, 'save' )
  const options = Object.assign( {}, defaultOption, query )
  req.bridge( req.body ).save( options )
    .then( res.json.bind( res ) )
    .catch( next )
}
const recover: RequestHandler<unknown, unknown, RecoverBody, RecoverQuery> = ( req, res, next ) => {
  const query = parse( req.query )
  const defaultOption = option( req.bridge, 'recover' )
  const options = Object.assign( {}, defaultOption, query )
  req.bridge( req.body ).recover( options )
    .then( res.json.bind( res ) )
    .catch( next )
}
const remove: RequestHandler<unknown, unknown, RemoveBody, RemoveQuery> = ( req, res, next ) => {
  const query = parse( req.query )
  const defaultOption = option( req.bridge, 'remove' )
  const options = Object.assign( {}, defaultOption, query )
  req.bridge( req.body ).remove( options )
    .then( res.json.bind( res ) )
    .catch( next )
}

const softRemove: RequestHandler<unknown, unknown, SoftRemoveBody, SoftRemoveQuery> = ( req, res, next ) => {
  const query = parse( req.query )
  const defaultOption = option( req.bridge, 'softRemove' )
  const options = Object.assign( {}, defaultOption, query )
  req.bridge( req.body ).softRemove( options )
    .then( res.json.bind( res ) )
    .catch( next )
}

export { save, recover, remove, softRemove }

/*
methodsRouter.put( paths( save.name, '/' ), handler( save ) )
methodsRouter.patch( paths( recovery.name ), handler( recovery ) )
methodsRouter.delete( paths( remove.name ), handler( remove ) )
methodsRouter.delete( paths( softRemove.name ), handler( softRemove ) )
*/
