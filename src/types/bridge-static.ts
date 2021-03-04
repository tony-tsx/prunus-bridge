/* eslint-disable @typescript-eslint/no-unused-vars */
import op from '../op'
import BridgeCall from './bridge-call'
import BridgeConstructor from './bridge-constructor'
import BridgeDelegations from './bridge-delegations'
import BridgeStaticDelete from './bridge-static-delete'
import BridgeStaticFind from './bridge-static-find'
import BridgeStaticInsert from './bridge-static-insert'
import BridgeStaticTools from './bridge-static-tools'
import BridgeStaticUpdate from './bridge-static-update'
import Config from './config'
import { AnyTarget, Extract } from './helpers'

namespace BridgeStatic {
  export import Find = BridgeStaticFind
  export import Insert = BridgeStaticInsert
  export import Update = BridgeStaticUpdate
  export import Delete = BridgeStaticDelete
  export import Call = BridgeCall
  export import Constructor = BridgeConstructor
  export import Delegations = BridgeDelegations
  export import Tools = BridgeStaticTools
}

export interface BridgeStaticMethods<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
> extends
  BridgeStatic.Find<E, S, I>,
  BridgeStatic.Insert<E, S, I>,
  BridgeStatic.Update<E, S, I>,
  BridgeStatic.Delete<E, S, I>,
  BridgeStatic.Tools<E> {}

export type AnyBridgeStaticMethods = BridgeStaticMethods<AnyTarget, { [key: string]: any }, { [key: string]: any }>
export interface IBridgeStatic<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
> extends
  BridgeStaticMethods<E, S, I>,
  BridgeStatic.Call<E, S, I>,
  BridgeStatic.Constructor<E, S, I>,
  BridgeStatic.Delegations<E> {
    uri: string
    bindings: ( keyof Extract.Entity<E> )[]
    op: typeof op
    config: Config<E, S, I>
  }

type BridgeStatic<
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  > =
  IBridgeStatic<E, S, I> & S

export default BridgeStatic
