import { BridgeRequestHandler } from '../../types/bridge-handler'
import BridgeStatic from '../../types/bridge-static'

const insert: insert.Handler = ( bridge: BridgeStatic<any>, req, res, next ) => {
  bridge.insert( req.body )
    .then( res.json.bind( res ) )
    .catch( next )
}

namespace insert {
  export type Query = { method: 'insert' }
  export type Body = any | any[]
  export type Handler = BridgeRequestHandler<undefined, any, Body, Query>
}

export default insert
