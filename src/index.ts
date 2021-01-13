import createBridge from './create-bridge'
import { _require } from './helpers/_import'
import Bridge from './types/bridge'
import { AnyTarget } from './types/helpers'

type createHandle = typeof import( './handlers' )
type createCommand = typeof import( './cli' )

namespace TypeORMBridge {
  export const create = createBridge
  export const command = <E extends AnyTarget, S, I>( bridge: Bridge<E, S, I> ) =>
    new ( _require<createCommand>( './cli', __dirname ).default )( bridge as any )
  export const router = <E extends AnyTarget, S, I>( bridge: Bridge<E, S, I> ) =>
    _require<createHandle>( './handlers', __dirname ).default( bridge as any )
}

export = TypeORMBridge
