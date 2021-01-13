import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'

const findAndUpdate: findAndUpdate.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findAndUpdate( req.query.options, req.body )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findAndUpdate {
  export type Query = { method: 'findAndUpdate', options?: FindManyOptions<any> }
  export type Body = any
  export type Handler = BridgeRequestHandler<undefined, any, Body, Query>
}

export default findAndUpdate
