import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'

const insertAndFind: insertAndFind.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.insertAndFind( req.body )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace insertAndFind {
  export type Query = { method: 'insertManyAndFind' }
  export type Body = any[]
  export type Handler = BridgeRequestHandler<undefined, any, Body, Query>
}

export default insertAndFind
