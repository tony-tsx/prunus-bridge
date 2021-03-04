/* eslint-disable @typescript-eslint/no-unused-vars */
import createBridge from './create-bridge'
import { Configuration } from './create-handler'
import { _require } from './helpers/_import'
import Bridge from './types/bridge'
import BridgeInstance from './types/bridge-instance'
import { AnyTarget } from './types/helpers'

type createRouter = typeof import( './handlers' )
type createCommand = typeof import( './cli' )
type createHandler = typeof import( './create-handler' )
namespace TypeORMBridge {
  export import Instance = BridgeInstance
  export const create = createBridge

  export const command = <
    E extends AnyTarget,
    S extends { [key: string]: any },
    I extends { [key: string]: any }
  >( bridge: Bridge<E, S, I> ) =>
      new ( _require<createCommand>( './cli', __dirname ).default )( bridge as any )

  export const router = <
    E extends AnyTarget,
    S extends { [key: string]: any },
    I extends { [key: string]: any }
  >( bridge: Bridge<E, S, I> ) =>
      _require<createRouter>( './handlers', __dirname ).default( bridge as any )

  export const handler = ( config?: Configuration ) =>
    _require<createHandler>( './create-handler', __dirname ).default( config )
}

type TypeORMBridge<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
> = Bridge<E, S, I>

export = TypeORMBridge
