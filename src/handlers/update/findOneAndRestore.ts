import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindOneOptions } from '../../types/bridge-static-find'

const findOneAndRestore: findOneAndRestore.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findOneAndRestore( req.params.id, req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findOneAndRestore {
  export type Query = { method: 'findOneAndRestore', options?: FindOneOptions<any> }
  export type Params = { id: any }
  export type Handler = BridgeRequestHandler<Params, any, undefined, Query>
}

export default findOneAndRestore
