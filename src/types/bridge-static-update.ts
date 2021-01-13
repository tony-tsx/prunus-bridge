import { UpdateResult } from 'typeorm'

import { Union } from './bridge-static-find'
import { AnyTarget, Criteria, Extract } from './helpers'

namespace BridgeStaticUpdate {
  type UpdateArg<E extends AnyTarget> = [ data: Extract.Entity<E> ]
  export type findAndUpdate<E extends AnyTarget, S = {}, I = {}> = Union.find<E, S, I, UpdateArg<E>>
  export type findByIdsAndUpdate<E extends AnyTarget, S = {}, I = {}> = Union.findByIds<E, S, I, UpdateArg<E>>
  export type findOneAndUpdate<E extends AnyTarget, S = {}, I = {}> = Union.findOne<E, S, I, UpdateArg<E>>
  export type findOneOrFailAndUpdate<E extends AnyTarget, S = {}, I = {}> = Union.findOneOrFail<E, S, I, UpdateArg<E>>

  export type findAndRestore<E extends AnyTarget, S = {}, I = {}> = Union.find<E, S, I>
  export type findByIdsAndRestore<E extends AnyTarget, S = {}, I = {}> = Union.findByIds<E, S, I>
  export type findOneAndRestore<E extends AnyTarget, S = {}, I = {}> = Union.findOne<E, S, I>
  export type findOneOrFailAndRestore<E extends AnyTarget, S = {}, I = {}> = Union.findOneOrFail<E, S, I>

  export type update<E extends AnyTarget> =
    ( criteria: Criteria<E> | undefined, data: Extract.Entity<E> ) => Promise<UpdateResult>
  export type restore<E extends AnyTarget> = ( criteria?: Criteria<E> ) => Promise<UpdateResult>
}

interface BridgeStaticUpdate<E extends AnyTarget, S = {}, I = {}> {
  findAndUpdate: BridgeStaticUpdate.findAndUpdate<E, S, I>
  findByIdsAndUpdate: BridgeStaticUpdate.findByIdsAndUpdate<E, S, I>
  findOneAndUpdate: BridgeStaticUpdate.findOneAndUpdate<E, S, I>
  findOneOrFailAndUpdate: BridgeStaticUpdate.findOneOrFailAndUpdate<E, S, I>

  findAndRestore: BridgeStaticUpdate.findAndRestore<E, S, I>
  findByIdsAndRestore: BridgeStaticUpdate.findByIdsAndRestore<E, S, I>
  findOneAndRestore: BridgeStaticUpdate.findOneAndRestore<E, S, I>
  findOneOrFailAndRestore: BridgeStaticUpdate.findOneOrFailAndRestore<E, S, I>

  update: BridgeStaticUpdate.update<E>
  restore: BridgeStaticUpdate.restore<E>
}

export default BridgeStaticUpdate
