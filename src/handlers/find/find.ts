import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { applyDefaultFindOptions } from '../helpers'

const find: find.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.find( ...applyDefaultFindOptions( bridge, req.query.method, req.query.options ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace find {
  export type Query = { method: 'find', options?: FindManyOptions<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default find
