import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'

const insertAndFind: insertAndFind.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.insertAndFind( req.body, req.query.options )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace insertAndFind {
  export type Query = { method: 'insertManyAndFind', options?: Omit<FindManyOptions<any>, 'where'> }
  export type Body = any[]
  export type Handler = BridgeRequestHandler<undefined, any, Body, Query>
}

export default insertAndFind
