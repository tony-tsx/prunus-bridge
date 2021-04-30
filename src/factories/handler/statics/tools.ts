import { Request, Response, NextFunction } from 'express'
import { getBridgeEntitySchemas as schemas } from '../../../helpers/getBridgeEntitySchemas'

import { parseQueryRecursive as parse } from '../../../helpers/parseQueryRecursive'
import { AnyBridge } from '../../../typings/bridge'
import { RouteOptions } from '../../../typings/route-options'

const clear = ( bridge: AnyBridge, req: Request, res: Response, next: NextFunction, options: RouteOptions ) =>
  options.interceptors?.clear
    ? options.interceptors.clear( [], req, res, next )
    : bridge.clear()

const count = ( bridge: AnyBridge, req: Request, res: Response, next: NextFunction, routeOptions: RouteOptions) =>
  schemas.findManyConditionsOrOptions( bridge )
    .then( schema => schema.validate( parse( req.query ) ) )
    .then( options => {
      if ( routeOptions.interceptors?.count )
        return routeOptions.interceptors.count( [ options ], req, res, next )
      return bridge.count( options )
    } )

const increment = ( bridge: AnyBridge, req: Request<any, any,any, any>, res: Response, next: NextFunction, options: RouteOptions ) =>
  schemas.findConditions( bridge )
    .then( schema => schema.validate( parse( req.query.conditions ) ) )
    .then( conditions => conditions as any )
    .then( conditions => {
      const property = parse( req.query.propertyPath )
      const value = parse( req.query.value )
      if ( options.interceptors?.increment )
        return options.interceptors.increment( [ conditions, property, value ], req, res, next )
      return bridge.increment( conditions, property, value )
    } )
    
const decrement = ( bridge: AnyBridge, req: Request<any, any,any, any>, res: Response, next: NextFunction, options: RouteOptions ) =>
  schemas.findConditions( bridge )
    .then( schema => schema.validate( parse( req.query.conditions ) ) )
    .then( conditions => conditions as any )
    .then( conditions => {
      const property = parse( req.query.propertyPath )
      const value = parse( req.query.value )
      if ( options.interceptors?.decrement )
        return options.interceptors.decrement( [ conditions, property, value ], req, res, next )
      return bridge.decrement( conditions, property, value )
    } )

export { count, clear, increment, decrement }
