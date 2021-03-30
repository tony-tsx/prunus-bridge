import { DeleteResult, FindConditions, FindManyOptions, FindOneOptions, InsertResult, ObjectID, RemoveOptions, SaveOptions, UpdateResult } from 'typeorm'
import TypeORM from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { BRIDGE_IDENTIFY } from '../factories/bridge'
import { Operators } from '../tools/operators'

type Bridge<E, S, P> = Bridge.StaticBind<E, S, P> & Bridge.Constructor<E, S, P>

type AnyObject = { [key: string]: any }

namespace Bridge {

  export namespace Extractors {
    export type Repository<T extends AnyBridge | AnyBridgeInstance> =
      TypeORM.Repository<Entity<T>>
    export type Entity<T extends AnyBridge | AnyBridgeInstance> =
      T extends Bridge<infer E, any, any>
        ? E
        : T extends Bridge.Instance<infer E, any, any>
          ? E
          : never
    export type Instance<T extends AnyBridge> =
      T extends Bridge<infer E, infer S, infer P>
        ? Bridge.Instance<E, S, P>
        : never
  }

  export namespace Helpers {
    export type Criteria<E> =
     | string | string[]
     | number | number[]
     | Date | Date[]
     | ObjectID | ObjectID[]
     | FindConditions<E>
  }

  export interface Constructor<E, S, P> extends Static<E, S, P> {
    new ( properties?: Partial<Instance.Data<E>> ): Instance<E, S, P>
    ( properties?: Partial<Instance.Data<E>> ): Instance<E, S, P>
    ( collection?: Partial<Instance.Data<E>>[] ): Instance<E, S, P>[]
    [BRIDGE_IDENTIFY]: keyof any
    op: typeof Operators
  }

  export type StaticBind<E, S, P> = S extends AnyObject ? {
    [K in keyof S]:
      S[K] extends Function
        ? ( this: Bridge<E, S, P>, ...args: Parameters<S[K]> ) => ReturnType<S[K]>
        : S[K]
  } : never

  export interface Static<E, S, P> extends
    Static.Find<E, S, P>,
    Static.Insert<E, S, P>,
    Static.Update<E, S, P>,
    Static.Delete<E, S, P>,
    Static.Tools<E, S, P>,
    // eslint-disable-next-line no-undef
    globalThis.BridgeExtends<E, S, P> {}

  export namespace Static {
    export interface Find<E, S, P> {
      find( this: Bridge<E, S, P>, options?: FindManyOptions<E> ):
        Promise<Bridge.Instance<E, S, P>[]>

      find( this: Bridge<E, S, P>, conditions?: FindConditions<E> ):
        Promise<Bridge.Instance<E, S, P>[]>

      findAndCount( this: Bridge<E, S, P>, options?: FindManyOptions<E> ):
        Promise<readonly [ Bridge.Instance<E, S, P>[], number ]>
      findAndCount( this: Bridge<E, S, P>, conditions?: FindConditions<E> ):
        Promise<readonly [ Bridge.Instance<E, S, P>[], number ]>

      findByIds( this: Bridge<E, S, P>, ids: any[], options?: FindManyOptions<E> ):
        Promise<Bridge.Instance<E, S, P>[]>
      findByIds( this: Bridge<E, S, P>, ids: any[], conditions?: FindConditions<E> ):
        Promise<Bridge.Instance<E, S, P>[]>

      findOne( this: Bridge<E, S, P>, id?: string | number | Date | ObjectID, options?: FindOneOptions<E> ):
        Promise<Bridge.Instance<E, S, P> | undefined>
      findOne( this: Bridge<E, S, P>, options?: FindOneOptions<E> ):
        Promise<Bridge.Instance<E, S, P> | undefined>
      findOne( this: Bridge<E, S, P>, conditions?: FindConditions<E>, options?: FindOneOptions<E> ):
        Promise<Bridge.Instance<E, S, P> | undefined>

      findOneOrFail( this: Bridge<E, S, P>, id?: string | number | Date | ObjectID, options?: FindOneOptions<E> ):
        Promise<Bridge.Instance<E, S, P>>
      findOneOrFail( this: Bridge<E, S, P>, options?: FindOneOptions<E> ):
        Promise<Bridge.Instance<E, S, P>>
      findOneOrFail( this: Bridge<E, S, P>, conditions?: FindConditions<E>, options?: FindOneOptions<E> ):
        Promise<Bridge.Instance<E, S, P>>
    }

    export interface Insert<E, S, P> {
      insert( this: Bridge<E, S, P>, query: QueryDeepPartialEntity<E> | QueryDeepPartialEntity<E>[] ):
        Promise<InsertResult>

      insertOne( this: Bridge<E, S, P>, query: QueryDeepPartialEntity<E> ): Promise<InsertResult>

      insertAndFind( this: Bridge<E, S, P>,
        query: QueryDeepPartialEntity<E> | QueryDeepPartialEntity<E>[],
        options?: FindManyOptions<E> ): Promise<Bridge.Instance<E, S, P>[]>

      insertOneAndFind( this: Bridge<E, S, P>,
        query: QueryDeepPartialEntity<E>, options?: FindOneOptions<E> ): Promise<Bridge.Instance<E, S, P>>
    }

    export interface Update<E, S, P> {
      update( this: Bridge<E, S, P>,
        criteria: Helpers.Criteria<E>, partialEntity: QueryDeepPartialEntity<E> ): Promise<UpdateResult>
      restore( this: Bridge<E, S, P>, criteria: Helpers.Criteria<E> ): Promise<UpdateResult>
    }

    export interface Delete<E, S, P> {
      delete( this: Bridge<E, S, P>, criteria: Helpers.Criteria<E> ): Promise<DeleteResult>
      softDelete( this: Bridge<E, S, P>, criteria: Helpers.Criteria<E> ): Promise<UpdateResult>
    }

    export interface Tools<E, S, P> {
      clear( this: Bridge<E, S, P> ): Promise<void>
      count( this: Bridge<E, S, P>, option?: FindManyOptions<E> ): Promise<number>
      count( this: Bridge<E, S, P>, conditions?: FindConditions<E> ): Promise<number>
      decrement( this: Bridge<E, S, P>, conditions: FindConditions<E>, propertyPath: string, value: number | string ):
        Promise<UpdateResult>
      increment( this: Bridge<E, S, P>, conditions: FindConditions<E>, propertyPath: string, value: number | string ):
        Promise<UpdateResult>
    }
  }
  export namespace Instance {
    export type Data<E> = E extends object ? E : never
    export type PrototypeBind<E, S, P> = P extends AnyObject ? {
      [K in keyof P]:
        P[K] extends Function
          ? ( this: Instance<E, S, P>, ...args: Parameters<P[K]> ) => ReturnType<P[K]>
          : P[K]
    } : never
    // eslint-disable-next-line no-undef
    export interface Methods<E, S, P> extends globalThis.BridgeIstanceExtends<E, S, P> {
      save( this: Instance<E, S, P>, options?: SaveOptions ): Promise<this>
      recover( this: Instance<E, S, P>, options?: SaveOptions ): Promise<this>
      remove( this: Instance<E, S, P>, option?: RemoveOptions ): Promise<this>
      softRemove( this: Instance<E, S, P>, option?: SaveOptions ): Promise<this>
    }

    export interface Identifier {
      [BRIDGE_IDENTIFY]: keyof any
    }
  }
  export type Instance<E, S, P> =
    & Instance.Methods<E, S, P>
    & Instance.Data<E>
    & Instance.PrototypeBind<E, S, P>
    & Instance.Identifier
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface BridgeExtends<E, S, P> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface BridgeIstanceExtends<E, S, P> {}
}

type AnyBridge = Bridge<AnyObject, AnyObject, AnyObject>
type AnyBridgeInstance = Bridge.Instance<AnyObject, AnyObject, AnyObject>
type AnyBridgeStatic = Bridge.Static<AnyObject, AnyObject, AnyObject>

export { Bridge, AnyBridge, AnyBridgeInstance, AnyBridgeStatic }
