import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'

const insertOne: insertOne.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.insertOne( req.body )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace insertOne {
  export type Query = { method: 'insertOne' }
  export type Body = any
  export type Handler = BridgeRequestHandler<undefined, any, Body, Query>
}

export default insertOne
