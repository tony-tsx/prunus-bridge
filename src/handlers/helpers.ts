import { RequestHandler, Request } from 'express'
import { NotFound } from 'http-errors'

import { AnyBridge } from '../typings/bridge'

const bridgeAttach = <T extends AnyBridge>( bridge: T ): RequestHandler => {
  return ( req, res, next ) => {
    req.bridge = bridge
    next()
  }
}

const bridgeInstanceAttach = ( getParameterIdentifier: string | ( ( req: Request ) => any ) ): RequestHandler => {
  return ( req, res, next ) => {
    const identifier = typeof getParameterIdentifier === 'function' ? getParameterIdentifier( req ) : req.params[getParameterIdentifier]
    req.bridge.findOne( identifier )
      .then( instance => {
        if ( !instance )
          next( new NotFound( `${req.bridge.name} not found with ${getParameterIdentifier} ${identifier}` ) )
        req.entity = instance
        next()
      } )
      .catch( next )
  }
}

export { bridgeAttach, bridgeInstanceAttach }
