import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'

const count: count.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.count( req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace count {
  export type Query = { method: 'count', options?: FindManyOptions<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default count
