import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { applyDefaultFindOptions } from '../helpers'

const findAndCount: findAndCount.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findAndCount( ...applyDefaultFindOptions( bridge, req.query.method, req.query.options ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findAndCount {
  export type Query = { method: 'findAndCount', options?: FindManyOptions<any> }
  export type Handler = BridgeRequestHandler<undefined, any, undefined, Query>
}

export default findAndCount
