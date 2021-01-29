import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { Criteria } from '../../types/helpers'
import { applyDefaultCriteria } from '../helpers'

const _delete: _delete.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.delete( ...applyDefaultCriteria( bridge, req.query.method, req.query.criteria ?? {} ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace _delete {
  export type Query = { method: 'delete', criteria?: Criteria<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default _delete
