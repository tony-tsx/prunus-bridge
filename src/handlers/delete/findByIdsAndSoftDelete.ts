import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'

const findByIdsAndSoftDelete: findByIdsAndSoftDelete.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findByIdsAndSoftDelete( req.query.ids, req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findByIdsAndSoftDelete {
  export type Query = { method: 'findByIdsAndSoftDelete', ids: any[], options?: FindManyOptions<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default findByIdsAndSoftDelete
