import { RequestHandler } from 'express'

import { AnyBridgeStatic } from '../typings/bridge'
import { getBridgeOptions } from './getBridgeOptions'

const delegateBridgeHandler = <T extends RequestHandler<any, any, any, any>>(
  handler: T,
  name?: keyof AnyBridgeStatic
): RequestHandler => {
  return ( req, res, next ) => {
    const key = name ?? handler.name
    const optionalHandler = getBridgeOptions( req.bridge ).routeOptions?.handlersMiddlewares?.[key]
    if ( optionalHandler ) optionalHandler( req, res, ( e: any ) => {
      if ( e ) next( e )
      else {
        handler( req, res, next )
      }
    } )
    else handler( req, res, next )
  }
}

export { delegateBridgeHandler }
