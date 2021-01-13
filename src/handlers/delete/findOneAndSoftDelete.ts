import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindOneOptions } from '../../types/bridge-static-find'

const findOneAndSoftDelete: findOneAndSoftDelete.Handler =
  ( bridge: BridgeStatic<any>, req, res, next ) => {
    bridge.findOneAndSoftDelete( req.params.id, req.query.options )
      .then( res.json.bind( res ) )
      .catch( next )
  }

namespace findOneAndSoftDelete {
  export type Query = { method: 'findOneAndSoftDelete', options?: FindOneOptions<any> }
  export type Params = { id: any }
  export type Handler = BridgeRequestHandler<Params, any, undefined, Query>
}

export default findOneAndSoftDelete
