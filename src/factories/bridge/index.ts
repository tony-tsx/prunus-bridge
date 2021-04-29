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

const factoryBridge = ( function <E, S = {}, P = {}>(
  this: { [key: string]: AnyBridge },
  options: factoryBridge.Options<E, S, P>
): Bridge<E, S, P> {
  let Target: new () => E

  if ( useTypeormSystem() ) {
    const TypeORMEntity = options.getTypeORMEntity()
    if ( TypeORMEntity instanceof Promise )
      TypeORMEntity.then( typeormEntityTarget => Target = typeormEntityTarget )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    else Target = TypeORMEntity
  }

  this[options.name] = ( function( entity: any ) {
    if ( !( this instanceof Bridge ) )
      if ( Array.isArray( entity ) )
        return entity.map( Bridge )
      else return new Bridge( entity )

    const self = Target ? Object.assign( new Target(), this ) : this
    
    Object.assign( self, entity )
  
    Object.defineProperties( self, Object.getOwnPropertyDescriptors( Bridge.prototype ) )
  
    Object.defineProperty( self, BRIDGE_IDENTIFY, Object.getOwnPropertyDescriptor( Bridge, BRIDGE_IDENTIFY ) )
  
    Object.defineProperty( self, BRIDGE_STATIC, Bridge )
  
    return self
  } ) as AnyBridge

  const Bridge = this[options.name]

  Object.defineProperty( Bridge, 'op', { value: Operators, enumerable: false, writable: false, configurable: false } )

  Object.defineProperty( Bridge, BRIDGE_IDENTIFY, {
    value: records.register( { bridge: Bridge, options }, options.identifier ),
    configurable: false,
    writable: false,
    enumerable: false,
  } )

  Object.defineProperties( Bridge, Object.getOwnPropertyDescriptors( statics ) )
  Object.defineProperties( Bridge.prototype, Object.getOwnPropertyDescriptors( methods ) )

  if ( options.prototype )
    Object.defineProperties( Bridge.prototype, Object.getOwnPropertyDescriptors( options.prototype ) )

  if ( options.static )
    Object.defineProperties( Bridge, Object.getOwnPropertyDescriptors( options.static ) )

  delete this[options.name]

  return Bridge as Bridge<E, S, P>
} ).bind( {} )

declare namespace factoryBridge {
  export interface TwoCombineSides {
    [SERVER_PROPERTY]: any
    [CLIENT_PROPERTY]: any
  }
  export interface Options<E, S, P> extends BridgeOptions<E, S, P> {}
}

export { factoryBridge, BRIDGE_IDENTIFY, CLIENT_PROPERTY, SERVER_PROPERTY, BRIDGE_STATIC }
