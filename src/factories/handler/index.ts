import { NextFunction, Request, Response, Router } from 'express'
import { bridgeAttach, bridgeInstanceAttach } from '../../handlers/helpers'
import { createHandlerPaths } from '../../helpers'
import { getExpress } from '../../helpers/internals/getExpress'
import { AnyBridge } from '../../typings/bridge'
import { RouteOptions } from '../../typings/route-options'
import *  as methods from './methods'
import * as statics from './statics'
import { HTTP_METHODS_NAMES, HTTP_METHODS_MAP, BASE_PATHS, STATIC_METHODS_KEYS, INSTANCE_METHODS_KEYS, METHODS_KEYS } from './constants'

const standard = <
  T extends typeof STATIC_METHODS_KEYS | typeof INSTANCE_METHODS_KEYS,
  G extends { [K in T extends ( infer M )[] ? M : never]: ( bridge: AnyBridge, query: any, body: any, params: any, options: RouteOptions ) => any }
>(
  keys: T,
  groups: G,
  options: RouteOptions,
  route: Router,
) => {
  keys.forEach( ( method: any ) => {
    const http = HTTP_METHODS_NAMES.find( http => HTTP_METHODS_MAP[http].includes( method ) )

    if ( !http ) throw new Error( `${method} not find http method` )

    const isBase = BASE_PATHS.includes( method )

    const path = createHandlerPaths( options.paths?.[method], method, isBase ? '/' : null )

    const handler = options.replaces[method] ? options.replaces[method] :
      ( req: Request, res: Response, next: NextFunction ) => {
        if ( method in groups )
          groups[method]( req.bridge, req.query, req.body, req.params, options )
            .then( ( data: any ) => {
              if ( options.responses?.[method] )
                return options.responses?.[method]( data, req, res, next )
              res.json( data )
            } )
            .catch( next )

        else next()
      }

    route[http]( path, options.middlewares?.[method], handler )
  } )
}

const factoryHandler = <T extends AnyBridge>(
  bridge: T,
  options: RouteOptions = {},
) => {
  const route = getExpress.sync().Router()

  options.beforeBridgeAttach?.( route )
  route.use( bridgeAttach( bridge ) )
  options.afterBridgeAttach?.( route )

  options.beforeBridgeHandlersAttach?.( route )
  Object.entries( options.handlers ?? {} ).forEach( ( [ method, paths ] ) => {
    Object.entries( paths ).forEach( ( [ path, handler ] ) => handler[method]( path, handler ) )
  } )
  options.afterBridgeHandlersAttach?.( route )

  options.beforeStandardHandlersAttach?.( route )
  standard( STATIC_METHODS_KEYS, statics, options, route )
  standard( INSTANCE_METHODS_KEYS, methods, options, route )
  options.afterStandardHandlersAttach?.( route )

  options.afterSetup?.( route )
  return route
}

factoryHandler.match = <T extends AnyBridge>(
  parameterKey: string | ( ( req: Request ) => any ),
  bridge: T,
  options: RouteOptions = {},
) => {
  const route = getExpress.sync().Router()
  return route
}

declare namespace factoryHandler {}

export { factoryHandler }
