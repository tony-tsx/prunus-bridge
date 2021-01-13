import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindOneOptions } from '../../types/bridge-static-find'

const findOneOrFailAndDelete: findOneOrFailAndDelete.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findOneOrFailAndDelete( req.params.id, req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findOneOrFailAndDelete {
  export type Query = { method: 'findOneOrFailAndDelete', options?: FindOneOptions<any> }
  export type Params = { id: any }
  export type Handler = BridgeRequestHandler<Params, any, undefined, Query>
}

export default findOneOrFailAndDelete
