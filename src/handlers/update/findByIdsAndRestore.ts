import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'

const findByIdsAndRestore: findByIdsAndRestore.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findByIdsAndRestore( req.query.ids, req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findByIdsAndRestore {
  export type Query = { method: 'findByIdsAndRestore', ids: any[], options?: FindManyOptions<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default findByIdsAndRestore
