import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindOneOptions } from '../../types/bridge-static-find'

const findOneOrFail: findOneOrFail.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findOneOrFail( req.params.id, req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findOneOrFail {
  export type Query = { method: 'findOneOrFail', options?: FindOneOptions<any> }
  export type Params = { id: any }
  export type Handler = BridgeRequestHandler<Params, any, undefined, Query>
}

export default findOneOrFail
