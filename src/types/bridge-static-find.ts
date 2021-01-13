import TypeORM from 'typeorm'

import BridgeInstance from './bridge-instance'
import { AnyTarget, Extract } from './helpers'

export type FindOneOptions<E extends AnyTarget> = TypeORM.FindOneOptions<Extract.Entity<E>>

export type FindManyOptions<E extends AnyTarget> = TypeORM.FindManyOptions<Extract.Entity<E>>

export type FindConditions<E extends AnyTarget> = TypeORM.FindConditions<Extract.Entity<E>>

export namespace Union {
  export type find<E extends AnyTarget, S = {}, I = {}, Args extends readonly any[] = []> =
    ( options?: FindManyOptions<E>, ...args: Args ) => Promise<BridgeInstance<E, S, I>[]>

  export type findByIds<E extends AnyTarget, S = {}, I = {}, Args extends readonly any[] = []> =
    ( ids: any[], options?: FindManyOptions<E>, ...args: Args ) => Promise<BridgeInstance<E, S, I>[]>

  export type findOne<E extends AnyTarget, S = {}, I = {}, Args extends readonly any[] = []> =
    ( id?: any, options?: FindOneOptions<E>, ...args: Args ) => Promise<BridgeInstance<E, S, I>>

  export type findOneOrFail<E extends AnyTarget, S = {}, I = {}, Args extends readonly any[] = []> =
    ( id?: any, options?: FindOneOptions<E>, ...args: Args ) => Promise<BridgeInstance<E, S, I>>
}

namespace BridgeStaticFind {
  export type find<E extends AnyTarget, S = {}, I = {}> = Union.find<E, S, I>
  export type findByIds<E extends AnyTarget, S = {}, I = {}> = Union.findByIds<E, S, I>
  export type findOne<E extends AnyTarget, S = {}, I = {}> = Union.findOne<E, S, I>
  export type findOneOrFail<E extends AnyTarget, S = {}, I = {}> = Union.findOneOrFail<E, S, I>

  export type findAndCount<E extends AnyTarget, S = {}, I = {}> =
    ( options?: FindManyOptions<E> ) => Promise<readonly [ BridgeInstance<E, S, I>[], number ]>
}

interface BridgeStaticFind<E extends AnyTarget, S = {}, I = {}> {
  find: BridgeStaticFind.find<E, S, I>
  findByIds: BridgeStaticFind.findByIds<E, S, I>
  findOne: BridgeStaticFind.findOne<E, S, I>
  findOneOrFail: BridgeStaticFind.findOneOrFail<E, S, I>

  findAndCount: BridgeStaticFind.findAndCount<E, S, I>
}

export default BridgeStaticFind
