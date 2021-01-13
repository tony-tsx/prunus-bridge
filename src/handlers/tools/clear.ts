import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'

const clear: clear.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.clear()
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace clear {
  export type Query = { method: 'clear' }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default clear
