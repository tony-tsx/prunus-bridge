import BridgeStatic from './bridge-static'
import { AnyTarget } from './helpers'

type AnyFunction = ( ...args: any[] ) => any

type ExtractFunction<T extends AnyFunction | readonly any[], R = any> =
  T extends AnyFunction
    ? T extends <
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  >( bridge: BridgeStatic<E, S, I>, ...args: any[] ) => any
      ? T
      : never
    : T extends readonly any[]
      ? <
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  >( bridge: BridgeStatic<E, S, I>, ...args: T ) => R
      : never

type BlindStaticMethod<T extends AnyFunction | readonly any[], R = any> = {
  server: ExtractFunction<T, R>
  client: ExtractFunction<T, R>
}

type AnyBlindStaticMethodFunction<A extends readonly any[], R> = <
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  >(
  bridge: BridgeStatic<E, S, I>, ...args: A
) => R

export type ExtractArgs<B extends BlindStaticMethod<any>> = 
  B extends BlindStaticMethod<infer T, any>
    ? ExtractFunction<T> extends AnyBlindStaticMethodFunction<infer A, any>
      ? A
      : never
    : never

export type ExtractReturn<B extends BlindStaticMethod<any>> = 
  B extends BlindStaticMethod<infer T, infer R1>
    ? ExtractFunction<T, R1> extends AnyBlindStaticMethodFunction<any, infer R2>
      ? R2
      : never
    : never

export default BlindStaticMethod
