import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindOneOptions } from '../../types/bridge-static-find'

const findOneOrFailAndSoftDelete: findOneOrFailAndSoftDelete.Handler =
  ( bridge: BridgeStatic<any>, req, res, next ) => {
    bridge.findOneOrFailAndSoftDelete( req.params.id, req.query.options )
      .then( res.json.bind( res ) )
      .catch( next )
  }

namespace findOneOrFailAndSoftDelete {
  export type Query = { method: 'findOneOrFailAndSoftDelete', options?: FindOneOptions<any> }
  export type Params = { id: any }
  export type Handler = BridgeRequestHandler<Params, any, undefined, Query>
}

export default findOneOrFailAndSoftDelete
