import { DeleteResult, UpdateResult } from 'typeorm'

import { Union } from './bridge-static-find'
import { AnyTarget, Criteria } from './helpers'
namespace BridgeStaticDelete {
  export type findAndDelete<
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  > = Union.find<E, S, I>
  export type findByIdsAndDelete<
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  > = Union.findByIds<E, S, I>
  export type findOneAndDelete<
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  > = Union.findOne<E, S, I>
  export type findOneOrFailAndDelete<
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  > = Union.findOneOrFail<E, S, I>

  export type findAndSoftDelete<
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  > = Union.find<E, S, I>
  export type findByIdsAndSoftDelete<
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  > = Union.findByIds<E, S, I>
  export type findOneAndSoftDelete<
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  > = Union.findOne<E, S, I>
  export type findOneOrFailAndSoftDelete<
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  > = Union.findOneOrFail<E, S, I>

  export type _delete<
    E extends AnyTarget> = ( criteria: Criteria<E> ) => Promise<DeleteResult>
  export type softDelete<
    E extends AnyTarget> = ( criteria: Criteria<E> ) => Promise<UpdateResult>
}

interface BridgeStaticDelete<
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  > {
  findAndDelete: BridgeStaticDelete.findAndDelete<E, S, I>
  findByIdsAndDelete: BridgeStaticDelete.findByIdsAndDelete<E, S, I>
  findOneAndDelete: BridgeStaticDelete.findOneAndDelete<E, S, I>
  findOneOrFailAndDelete: BridgeStaticDelete.findOneOrFailAndDelete<E, S, I>

  findAndSoftDelete: BridgeStaticDelete.findAndSoftDelete<E, S, I>
  findByIdsAndSoftDelete: BridgeStaticDelete.findByIdsAndSoftDelete<E, S, I>
  findOneAndSoftDelete: BridgeStaticDelete.findOneAndSoftDelete<E, S, I>
  findOneOrFailAndSoftDelete: BridgeStaticDelete.findOneOrFailAndSoftDelete<E, S, I>

  delete: BridgeStaticDelete._delete<E>
  softDelete: BridgeStaticDelete.softDelete<E>
}

export default BridgeStaticDelete
