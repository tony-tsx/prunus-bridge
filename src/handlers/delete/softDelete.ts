import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { Criteria } from '../../types/helpers'
import { applyDefaultCriteria } from '../helpers'

const softDelete: softDelete.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.softDelete( ...applyDefaultCriteria( bridge, req.query.method, req.query.criteria ?? {} ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace softDelete {
  export type Query = { method: 'softDelete', criteria?: Criteria<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default softDelete
