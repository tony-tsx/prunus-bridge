import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { Criteria } from '../../types/helpers'

const update: update.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.update( req.query.criteria ?? {}, req.body )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace update {
  export type Query = { method: 'update', criteria?: Criteria<any> }
  export type Body = any
  export type Handler = BridgeRequestHandler<undefined, any, Body, Query>
}

export default update
