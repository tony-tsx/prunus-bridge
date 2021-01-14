import { RemoveOptions } from 'typeorm'

import { AnyBridge } from '../../types/bridge'
import { BridgeRequestHandler } from '../../types/bridge-handler'

const remove: remove.Handler = async ( bridge: AnyBridge, req, res, next ) => {
  bridge( req.body ).remove( req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace remove {
  export type Query = { method: 'remove', options?: RemoveOptions }
  export type Body = any
  export type Handler = BridgeRequestHandler<undefined, any, Body, Query>
}

export default remove
