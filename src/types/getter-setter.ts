import BridgeInstance from './bridge-instance'
import BridgeStatic from './bridge-static'
import { AnyTarget } from './helpers'

export const GETTER_SETTER_ACCESS = Symbol( 'getter-setter-access' )

export interface GetterSetterStatic<
    E extends AnyTarget, S extends { [key: string]: any }, I extends { [key: string]: any }, V> {
  get( this: BridgeStatic<E, S, I> ): V
  set( this: BridgeStatic<E, S, I>, value: V ): void
  [GETTER_SETTER_ACCESS]: true
}

export interface GetterSetterInstance<
    E extends AnyTarget, S extends { [key: string]: any }, I extends { [key: string]: any }, V> {
  get( this: BridgeInstance<E, S, I> ): V
  set( this: BridgeInstance<E, S, I>, value: V ): void
  [GETTER_SETTER_ACCESS]: true
}

export interface BridgeGetterSetterInstance<V> {
  <
    E extends AnyTarget, S extends { [key: string]: any }, I extends { [key: string]: any }>( bridge: BridgeInstance<E, S, I> ): GetterSetterInstance<
    E, S, I, V>
}

export interface BridgeGetterSetterStatic<V> {
  <
    E extends AnyTarget, S extends { [key: string]: any }, I extends { [key: string]: any }>( bridge: BridgeStatic<E, S, I> ): GetterSetterStatic<
    E, S, I, V>
}
