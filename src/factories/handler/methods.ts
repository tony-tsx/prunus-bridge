import { NextFunction, Request, Response } from 'express'
import { parseQueryRecursive as parse } from '../../helpers/parseQueryRecursive'
import { AnyBridge } from '../../typings/bridge'
import { RouteOptions } from '../../typings/route-options'

const save = async ( bridge: AnyBridge, req: Request, res: Response, next: NextFunction, routeOptions: RouteOptions ) => {
  req.query = parse( req.query )
  const defaultOption = routeOptions.defaultOptions?.['save'] ?? {}
  const options = Object.assign( {}, defaultOption, req.query )
  if ( routeOptions.interceptors?.save )
    return routeOptions.interceptors.save( [ options ], req, res, next )
  return bridge( req.body ).save( options )
}
const recover = async ( bridge: AnyBridge, req: Request, res: Response, next: NextFunction, routeOptions: RouteOptions ) => {
  req.query = parse( req.query )
  const defaultOption = routeOptions.defaultOptions?.['recover'] ?? {}
  const options = Object.assign( {}, defaultOption, req.query )
  if ( routeOptions.interceptors?.recover )
    return routeOptions.interceptors.recover( [ options ], req, res, next )
  return bridge( req.body ).recover( options )
}
const remove = async ( bridge: AnyBridge, req: Request, res: Response, next: NextFunction, routeOptions: RouteOptions ) => {
  req.query = parse( req.query )
  const defaultOption = routeOptions.defaultOptions?.['remove'] ?? {}
  const options = Object.assign( {}, defaultOption, req.query )
  if ( routeOptions.interceptors?.remove )
    return routeOptions.interceptors.remove( [ options ], req, res, next )
  return bridge( req.body ).remove( options )
}

const softRemove = async ( bridge: AnyBridge, req: Request, res: Response, next: NextFunction, routeOptions: RouteOptions ) => {
  req.query = parse( req.query )
  const defaultOption = routeOptions.defaultOptions?.['softRemove'] ?? {}
  const options = Object.assign( {}, defaultOption, req.query )
  if ( routeOptions.interceptors?.softRemove )
    return routeOptions.interceptors.softRemove( [ options ], req, res, next )
  return bridge( req.body ).softRemove( options )
}

export { save, recover, remove, softRemove }
