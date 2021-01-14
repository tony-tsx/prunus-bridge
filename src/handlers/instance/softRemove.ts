import { SaveOptions } from 'typeorm'

import { AnyBridge } from '../../types/bridge'
import { BridgeRequestHandler } from '../../types/bridge-handler'

const softRemove: softRemove.Handler = async ( bridge: AnyBridge, req, res, next ) => {
  bridge( req.body ).softRemove( req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace softRemove {
  export type Query = { method: 'softRemove', options?: SaveOptions }
  export type Body = any
  export type Handler = BridgeRequestHandler<undefined, any, Body, Query>
}

export default softRemove
