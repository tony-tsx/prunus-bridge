import { AxiosInstance } from 'axios'
import { Connection } from 'typeorm'
import { ObjectSchema } from 'yup'
import { MixedSchema } from 'yup/lib/mixed'

import { SERVER_PROPERTY, CLIENT_PROPERTY } from '../factories/bridge'
import { Bridge } from './bridge'

namespace BridgeOptions {
  export interface SidesCombine {
    [SERVER_PROPERTY]: any
    [CLIENT_PROPERTY]: any
  }
  export type DelegateThis<T, This> = T extends { [key: string]: any } ?
    {
      [K in keyof T]: T[K] extends Function
        ? ( this: This, ...args: Parameters<T[K]> ) => ReturnType<T[K]>
        : T[K] extends BridgeOptions.SidesCombine
          ? (
            T[K][typeof SERVER_PROPERTY] extends Function
            ? (
              this: This,
              ...args: Parameters<T[K][typeof SERVER_PROPERTY]>
              ) => ReturnType<T[K][typeof SERVER_PROPERTY]>
            : T[K][typeof SERVER_PROPERTY]
          ) | (
            T[K][typeof CLIENT_PROPERTY] extends Function
            ? (
              this: This,
              ...args: Parameters<T[K][typeof CLIENT_PROPERTY]>
              ) => ReturnType<T[K][typeof CLIENT_PROPERTY]>
            : T[K][typeof CLIENT_PROPERTY]
          )
          : T[K]
    } : never
}

interface BridgeOptions<E, S, P> extends Prunus.GlobalBridgeOptions<E, S, P> {
  name: string
  getTypeORMEntity: () => ( new () => E ) | Promise<new () => E>
  getAxiosInstance?: () => AxiosInstance | Promise<AxiosInstance>
  getTypeORMConnection?: () => Connection | Promise<Connection> | any
  deleteToSoft?: boolean
  uri?: string
  connection?: string
  identifier?: keyof any
  prototype?: BridgeOptions.DelegateThis<P, Bridge.Instance<E, S, P>>
  static?: BridgeOptions.DelegateThis<S, Bridge<E, S, P>>
  schema?: ObjectSchema<any, any, any, any> | MixedSchema<any, any, any>
}

declare global {
  export namespace Prunus {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export interface GlobalBridgeOptions<E, S, P> {}
  }
}

export { BridgeOptions }
