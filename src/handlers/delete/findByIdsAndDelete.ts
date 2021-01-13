import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'

const findByIdsAndDelete: findByIdsAndDelete.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findByIdsAndDelete( req.query.ids, req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findByIdsAndDelete {
  export type Query = { method: 'findByIdsAndDelete', ids: any[], options?: FindManyOptions<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default findByIdsAndDelete
