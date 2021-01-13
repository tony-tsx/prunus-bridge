import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'

const findAndRestore: findAndRestore.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findAndRestore( req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findAndRestore {
  export type Query = { method: 'findAndRestore', options?: FindManyOptions<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default findAndRestore
