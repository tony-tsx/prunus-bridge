import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindOneOptions } from '../../types/bridge-static-find'

const findOneAndDelete: findOneAndDelete.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findOneAndDelete( req.params.id, req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findOneAndDelete {
  export type Query = { method: 'findOneAndDelete', options?: FindOneOptions<any> }
  export type Params = { id: any }
  export type Handler = BridgeRequestHandler<Params, any, undefined, Query>
}

export default findOneAndDelete
