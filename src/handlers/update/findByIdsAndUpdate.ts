import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'

const findByIdsAndUpdate: findByIdsAndUpdate.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findByIdsAndUpdate( req.query.ids, req.query.options, req.body )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findByIdsAndUpdate {
  export type Query = { method: 'findByIdsAndUpdate', ids: any[], options?: FindManyOptions<any> }
  export type Body = any
  export type Handler = BridgeRequestHandler<undefined, any, Body, Query>
}

export default findByIdsAndUpdate
