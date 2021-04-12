import { useTypeormSystem } from '../../helpers/useTypeormSystem'
import { Operators } from '../../tools/operators'
import { AnyBridge, Bridge } from '../../typings/bridge'
import { BridgeOptions } from '../../typings/bridge-options'
import { methods } from './methods'
import { records } from './records'
import { statics } from './statics'

const SERVER_PROPERTY = Symbol( 'server-property' )
const CLIENT_PROPERTY = Symbol( 'client-property' )
const BRIDGE_IDENTIFY = Symbol( 'bridge-identify' )
const BRIDGE_STATIC = Symbol( 'bridge-static' )

const constructor = ( name: string ) => `
  ( function() {
    return function ${name}( entity ) {
      if ( !( this instanceof bridge ) )
        if ( Array.isArray( entity ) )
          return entity.map( bridge )
        else return new bridge( entity )

      const self = EntityTarget ? Object.assign( new EntityTarget(), this ) : this

      Object.assign( self, entity )

      Object.defineProperties( self, Object.getOwnPropertyDescriptors( bridge.prototype ) )

      Object.defineProperty(
        self,
        BRIDGE_IDENTIFY,
        Object.getOwnPropertyDescriptor( bridge, BRIDGE_IDENTIFY )
      )

      Object.defineProperty(
        self,
        BRIDGE_STATIC,
        bridge
      )

      return self
    }
  } )()
`

const factoryBridge = <E, S = {}, P = {}>(
  options: factoryBridge.Options<E, S, P>
): Bridge<E, S, P> => {
  let EntityTarget: new () => E

  if ( useTypeormSystem() ) {
    const TypeORMEntity = options.getTypeORMEntity()
    if ( TypeORMEntity instanceof Promise )
      TypeORMEntity.then( typeormEntityTarget => EntityTarget = typeormEntityTarget )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    else EntityTarget = TypeORMEntity
  }

  // eslint-disable-next-line no-eval
  const bridge = eval( constructor( options.name ) ) as AnyBridge

  Object.defineProperty( bridge, 'op', { value: Operators, enumerable: false, writable: false, configurable: false } )

  Object.defineProperty( bridge, BRIDGE_IDENTIFY, {
    value: records.register( { bridge, options }, options.identifier ),
    configurable: false,
    writable: false,
    enumerable: false,
  } )

  Object.defineProperties( bridge, Object.getOwnPropertyDescriptors( statics ) )
  Object.defineProperties( bridge.prototype, Object.getOwnPropertyDescriptors( methods ) )

  if ( options.prototype )
    Object.defineProperties( bridge.prototype, Object.getOwnPropertyDescriptors( options.prototype ) )

  if ( options.static )
    Object.defineProperties( bridge, Object.getOwnPropertyDescriptors( options.static ) )

  return bridge as Bridge<E, S, P>
}

declare namespace factoryBridge {
  export interface TwoCombineSides {
    [SERVER_PROPERTY]: any
    [CLIENT_PROPERTY]: any
  }
  export interface Options<E, S, P> extends BridgeOptions<E, S, P> {}
}

export { factoryBridge, BRIDGE_IDENTIFY, CLIENT_PROPERTY, SERVER_PROPERTY, BRIDGE_STATIC }
