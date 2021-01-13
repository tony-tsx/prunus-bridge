import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { Criteria } from '../../types/helpers'

const _delete: _delete.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.delete( req.query.criteria ?? {} )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace _delete {
  export type Query = { method: 'delete', criteria?: Criteria<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default _delete
