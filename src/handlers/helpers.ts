import { RequestHandler } from 'express'
import { NotFound } from 'http-errors'

import { AnyBridge } from '../typings/bridge'

const bridgeAttach = <T extends AnyBridge>( bridge: T ): RequestHandler => {
  return ( req, res, next ) => {
    req.bridge = bridge
    next()
  }
}

const bridgeInstanceAttach = ( param: string ): RequestHandler => {
  return ( req, res, next ) => {
    req.bridge.findOne( req.params[param] )
      .then( instance => {
        if ( !instance )
          next( new NotFound( `${req.bridge.name} not found with ${param} ${req.params[param]}` ) )
        req.entity = instance
        next()
      } )
      .catch( next )
  }
}

export { bridgeAttach, bridgeInstanceAttach }
