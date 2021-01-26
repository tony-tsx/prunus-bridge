import createBridge from './create-bridge'
import { Configuration } from './create-handler'
import { _require } from './helpers/_import'
import Bridge from './types/bridge'
import { AnyTarget } from './types/helpers'

type createRouter = typeof import( './handlers' )
type createCommand = typeof import( './cli' )
type createHandler = typeof import( './create-handler' )
namespace TypeORMBridge {
  export const create = createBridge

  export const command = <E extends AnyTarget, S, I>( bridge: Bridge<E, S, I> ) =>
    new ( _require<createCommand>( './cli', __dirname ).default )( bridge as any )

  export const router = <E extends AnyTarget, S, I>( bridge: Bridge<E, S, I> ) =>
    _require<createRouter>( './handlers', __dirname ).default( bridge as any )

  export const handler = ( config?: Configuration ) =>
    _require<createHandler>( './create-handler', __dirname ).default( config )
}

export = TypeORMBridge
