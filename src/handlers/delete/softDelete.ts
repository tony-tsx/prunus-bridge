import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { Criteria } from '../../types/helpers'

const softDelete: softDelete.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.softDelete( req.query.criteria ?? {} )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace softDelete {
  export type Query = { method: 'softDelete', criteria?: Criteria<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default softDelete
