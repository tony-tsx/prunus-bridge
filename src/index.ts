import createBridge from './create-bridge'
import { _require } from './helpers/_import'
import { AnyBridge } from './types/bridge'

type createHandle = typeof import( './handlers' )
type createCommand = typeof import( './cli' )

namespace TypeORMBridge {
  export const create = createBridge
  export const command = ( bridge: AnyBridge ) =>
    new ( _require<createCommand>( './cli', __dirname ).default )( bridge )
  export const router = ( bridge: AnyBridge ) =>
    _require<createHandle>( './handlers', __dirname ).default( bridge )
}

export = TypeORMBridge
