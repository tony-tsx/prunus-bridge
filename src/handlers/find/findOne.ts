import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindOneOptions } from '../../types/bridge-static-find'
import { applyDefaultFindOptions } from '../helpers'

const findOne: findOne.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.findOne( ...applyDefaultFindOptions( bridge, req.query.method, req.params.id, req.query.options ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace findOne {
  export type Query = { method: 'findOne', options?: FindOneOptions<any> }
  export type Params = { id: any }
  export type Handler = BridgeRequestHandler<Params, any, undefined, Query>
}

export default findOne
