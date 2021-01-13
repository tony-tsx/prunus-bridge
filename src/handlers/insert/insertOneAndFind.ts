import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'

const insertOneAndFind: insertOneAndFind.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.insertOne( req.body )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace insertOneAndFind {
  export type Query = { method: 'insertOneAndFind' }
  export type Body = any
  export type Handler = BridgeRequestHandler<undefined, any, Body, Query>
}

export default insertOneAndFind
