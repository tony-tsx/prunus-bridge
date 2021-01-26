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

export interface IBridgeStatic<E extends AnyTarget, S = {}, I = {}> extends
  BridgeStatic.Find<E, S, I>,
  BridgeStatic.Insert<E, S, I>,
  BridgeStatic.Update<E, S, I>,
  BridgeStatic.Delete<E, S, I>,
  BridgeStatic.Tools<E>,
  BridgeStatic.Call<E, S, I>,
  BridgeStatic.Constructor<E, S, I>,
  BridgeStatic.Delegations<E> {
    uri: string
    bindings: ( keyof Extract.Entity<E> )[]
    op: typeof op
    config: Config<E, S, I>
  }

type BridgeStatic<E extends AnyTarget, S = {}, I = {}> =
  IBridgeStatic<E, S, I> & I

export default BridgeStatic
