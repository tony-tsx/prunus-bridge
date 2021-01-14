import { SaveOptions } from 'typeorm'

import { AnyBridge } from '../../types/bridge'
import { BridgeRequestHandler } from '../../types/bridge-handler'

const recovery: recovery.Handler = async ( bridge: AnyBridge, req, res, next ) => {
  bridge( req.body ).recovery( req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace recovery {
  export type Query = { method: 'recovery', options?: SaveOptions }
  export type Body = any
  export type Handler = BridgeRequestHandler<undefined, any, Body, Query>
}

export default recovery
