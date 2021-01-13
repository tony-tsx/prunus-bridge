import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindConditions } from '../../types/bridge-static-find'

const increment: increment.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.increment( req.query.conditions ?? {}, req.params.key, req.params.value )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace increment {
  export type Query = { method: 'increment', conditions?: FindConditions<any> }
  export type Params = { key: string, value: number }
  export type Handler = BridgeRequestHandler<Params, any, undefined, Query>
}

export default increment
