import { UpdateResult } from 'typeorm'

import { FindConditions, FindManyOptions } from './bridge-static-find'
import { AnyTarget } from './helpers'

namespace BridgeStaticTools {
  export type count<
    E extends AnyTarget> =
    ( options?: FindManyOptions<E> ) => Promise<number>

  export type increment<
    E extends AnyTarget> =
    ( conditions: FindConditions<E> | undefined, property: string, value?: number ) => Promise<UpdateResult>
  export type decrement<
    E extends AnyTarget> =
    ( conditions: FindConditions<E> | undefined, property: string, value?: number ) => Promise<UpdateResult>
  export type clear = () => Promise<void>
}

interface BridgeStaticTools<
    E extends AnyTarget> {
  count: BridgeStaticTools.count<E>
  increment: BridgeStaticTools.increment<E>
  decrement: BridgeStaticTools.decrement<E>
  clear: BridgeStaticTools.clear
}

export default BridgeStaticTools
