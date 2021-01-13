import { AxiosInstance } from 'axios'

import BridgeInstance from './bridge-instance'
import BridgeStatic from './bridge-static'
import { AnyTarget } from './helpers'

type Config<E extends AnyTarget, S, I> = {
  target: () => Promise<E>
  axios: () => Promise<AxiosInstance>
  uri: string
  connection?: string
  name?: string
  static?: {
    [K in keyof S]: S[K] extends ( ...args: any ) => any
      ? ( this: BridgeStatic<E, S, I>, ...args: Parameters<S[K]> ) => ReturnType<S[K]>
      : S[K]
  }
  prototype?: {
    [K in keyof I]: I[K] extends ( ...args: any ) => any
      ? ( this: BridgeInstance<E, S, I>, ...args: Parameters<I[K]> ) => ReturnType<I[K]>
      : I[K]
  }
}

export default Config
