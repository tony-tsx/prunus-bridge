import { Request, Response, NextFunction } from 'express'
import { getBridgeEntitySchemas as schemas } from '../../../helpers/getBridgeEntitySchemas'
import { AnyBridge } from '../../../typings/bridge'
import { RouteOptions } from '../../../typings/route-options'
import { find, findOneOrFail } from './find'

const insert = ( bridge: AnyBridge, req: Request, res: Response, next: NextFunction, options: RouteOptions ) =>
  schemas.insert( bridge )
    .then( schema => schema.validate( req.body ) )
    .then( body => {
      if ( options.interceptors?.insert )
        return options.interceptors.insert( [ body ], req, res, next )
      return bridge.insert( body )
    } )

const insertOne = ( bridge: AnyBridge, req: Request, res: Response, next: NextFunction, options: RouteOptions ) =>
  schemas.insertOne( bridge )
    .then( schema => schema.validate( req.body ) )
    .then( body => {
      if ( options.interceptors?.insertOne )
        return options.interceptors.insertOne( [ body as any ], req, res, next )
      return bridge.insertOne( body as any )
    } )

const insertAndFind = ( bridge: AnyBridge, req: Request<any, any, any, any>, res: Response, next: NextFunction, options: RouteOptions ) =>
  insert( bridge, req, res, next, options )
    .then( identifiers => {
      req.query = { ...req.query, where: identifiers }
      return find( bridge, req, res, next, options )
    } )

const insertOneAndFind = ( bridge: AnyBridge, req: Request<any, any, any, any>, res: Response, next: NextFunction, options: RouteOptions ) =>
  insertOne( bridge, req, res, next, options )
    .then( identifiers => {
      req.query = { idOrOptionsOrConditions: identifiers, options: req.query }
      return findOneOrFail( bridge, req, res, next, options )
    } )

export { insert, insertOne, insertAndFind, insertOneAndFind }
