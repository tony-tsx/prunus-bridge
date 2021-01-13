import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindOneOptions } from '../../types/bridge-static-find'

const findOneOrFailAndUpdate: findOneOrFailAndUpdate.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findOneOrFailAndUpdate( req.params.id, req.query.options, req.body )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findOneOrFailAndUpdate {
  export type Query = { method: 'findOneOrFailAndUpdate', options?: FindOneOptions<any> }
  export type Params = { id: any }
  export type Body = any
  export type Handler = BridgeRequestHandler<Params, any, Body, Query>
}

export default findOneOrFailAndUpdate
