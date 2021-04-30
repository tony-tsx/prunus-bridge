import { Request, Response, NextFunction } from 'express'
import { getBridgeEntitySchemas as schemas } from '../../../helpers/getBridgeEntitySchemas'

import { AnyBridge, Bridge } from '../../../typings/bridge'
import { RouteOptions } from '../../../typings/route-options'

const _delete = ( bridge: AnyBridge, req: Request, res: Response, next: NextFunction, options: RouteOptions ) =>
  schemas.criteria( bridge )
    .then( schema => schema.validate( req.query ) )
    .then( criteria => {
      if ( options.interceptors?.delete )
        return options.interceptors.delete( [ criteria ], req, res, next )
      return bridge.delete( criteria )
    } )

const softDelete = ( bridge: AnyBridge, req: Request, res: Response, next: NextFunction, options: RouteOptions ) =>
  schemas.criteria( bridge )
    .then( schema => schema.validate( req.query ) )
    .then( criteria => {
      if ( options.interceptors?.softDelete )
        return options.interceptors.softDelete( [ criteria ], req, res, next )
      return bridge.softDelete( criteria )
    } )

export { _delete as delete, softDelete }
