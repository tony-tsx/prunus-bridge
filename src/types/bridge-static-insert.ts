import { InsertResult } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import BridgeInstance from './bridge-instance'
import { AnyTarget, Extract } from './helpers'

export type query<E extends AnyTarget> = QueryDeepPartialEntity<Extract.Entity<E>>

namespace BridgeStaticInsert {
  export type insert<E extends AnyTarget> = ( entity: query<E> | query<E>[] ) => Promise<InsertResult>
  export type insertOne<E extends AnyTarget> = ( entity: query<E> ) => Promise<InsertResult>
  export type insertOneAndFind<E extends AnyTarget, S = {}, I = {}> =
    ( entity: query<E>[] ) => Promise<BridgeInstance<E, S, I>>

  export type insertAndFind<E extends AnyTarget, S = {}, I = {}> =
    ( entity: query<E>[] ) => Promise<BridgeInstance<E, S, I>[]>
}

interface BridgeStaticInsert<E extends AnyTarget, S = {}, I = {}> {
  insert: BridgeStaticInsert.insert<E>
  insertAndFind: BridgeStaticInsert.insertAndFind<E, S, I>
  insertOne: BridgeStaticInsert.insertOne<E>
  insertOneAndFind: BridgeStaticInsert.insertOneAndFind<E, S, I>
}

export default BridgeStaticInsert
