import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'

const findAndDelete: findAndDelete.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findAndDelete( req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findAndDelete {
  export type Query = { method: 'findAndDelete', options?: FindManyOptions<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default findAndDelete
