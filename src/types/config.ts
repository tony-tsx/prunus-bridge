import { AxiosInstance } from 'axios'

import BridgeInstance from './bridge-instance'
import BridgeStatic from './bridge-static'
import { AnyTarget } from './helpers'

/**
 * Configuration to create bridge
 */
type Config<
    E extends AnyTarget, S extends { [key: string]: any }, I extends { [key: string]: any }> = {
  /**
   * Get entity target
   */
  target: () => Promise<E>
  /**
   * Define axios instance to request, if not defined is use AxiosStatic
   */
  axios?: () => Promise<AxiosInstance>
  /**
   * Set path to use in axios request and path if not defined
   */
  uri: string
  /**
   * Set path to use in router create if not defined, use uri to default
   */
  path?: string
  /**
   * Define connection to use in bridge
   */
  connection?: string
  /**
   * Use bridge instance with custom name
   */
  name?: string
  /**
   * Create route in TypeORMBridge.handler if enable
   */
  handler?: boolean
  /**
   * Add to list of bridges
   */
  enumerable?: boolean
  /**
   * Add static methods or properties to bridge
   */
  static?: {
    [K in keyof S]: S[K] extends ( ...args: any ) => any
      ? ( this: BridgeStatic<E, S, I>, ...args: Parameters<S[K]> ) => ReturnType<S[K]>
      : S[K]
  }
  /**
   * Add instance methods or properties to bridge
   */
  prototype?: {
    [K in keyof I]: I[K] extends ( ...args: any ) => any
      ? ( this: BridgeInstance<E, S, I>, ...args: Parameters<I[K]> ) => ReturnType<I[K]>
      : I[K]
  }
}

export default Config
