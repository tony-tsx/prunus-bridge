import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'

const findByIds: findByIds.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findByIds( req.query.ids, req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findByIds {
  export type Query = { method: 'findByIds', ids: any[], options?: FindManyOptions<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default findByIds
