import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'

const findAndSoftDelete: findAndSoftDelete.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findAndSoftDelete( req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findAndSoftDelete {
  export type Query = { method: 'findAndSoftDelete', options?: FindManyOptions<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default findAndSoftDelete
