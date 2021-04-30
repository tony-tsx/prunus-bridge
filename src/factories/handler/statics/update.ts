import { Request, Response, NextFunction } from 'express'
import { getBridgeEntitySchemas as schemas } from '../../../helpers/getBridgeEntitySchemas'

import { AnyBridge } from '../../../typings/bridge'
import { RouteOptions } from '../../../typings/route-options'

const update = ( bridge: AnyBridge, req: Request, res: Response, next: NextFunction, options: RouteOptions ) =>
  Promise.all( [ schemas.criteria( bridge ), schemas.update( bridge ) ] )
    .then( ( [ criteriaSchema, updateSchema ] ) => Promise.all( [
      criteriaSchema.validate( req.query ),
      updateSchema.validate( req.body )
    ] ) )
    .then( ( [ criteria, update ] ) => {
      if ( options.interceptors?.update )
        return options.interceptors.update( [ criteria, update as any ], req, res, next )
      return bridge.update( criteria, update as any )
    } )
    .then( ( [ criteria, update ] ) => bridge.update( criteria, update as any ) )

const restore = ( bridge: AnyBridge, req: Request, res: Response, next: NextFunction, options: RouteOptions ) =>
  schemas.criteria( bridge )
    .then( schema => schema.validate( req.query ) )
    .then( criteria => {
      if ( options.interceptors?.restore )
        return options.interceptors.restore( [ criteria ], req, res, next )
      return bridge.restore( criteria )
    } )

export { update, restore }
