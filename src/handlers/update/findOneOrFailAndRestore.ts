import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindOneOptions } from '../../types/bridge-static-find'

const findOneOrFailAndRestore: findOneOrFailAndRestore.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findOneOrFailAndRestore( req.params.id, req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findOneOrFailAndRestore {
  export type Query = { method: 'findOneOrFailAndRestore', options?: FindOneOptions<any> }
  export type Params = { id: any }
  export type Handler = BridgeRequestHandler<Params, any, undefined, Query>
}

export default findOneOrFailAndRestore
