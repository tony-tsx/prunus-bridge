import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { Criteria } from '../../types/helpers'

const restore: restore.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.restore( req.query.criteria ?? {} )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace restore {
  export type Query = { method: 'restore', criteria?: Criteria<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default restore
