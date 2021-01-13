import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindConditions } from '../../types/bridge-static-find'

const decrement: decrement.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.decrement( req.query.conditions ?? {}, req.params.property, req.params.value )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace decrement {
  export type Query = { method: 'decrement', conditions?: FindConditions<any> }
  export type Params = { property: string, value: number }
  export type Handler = BridgeRequestHandler<Params, any, undefined, Query>
}

export default decrement
