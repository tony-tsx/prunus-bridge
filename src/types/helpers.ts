import { RequestHandler } from 'express'
import TypeORM, { EntitySchema, ObjectType, FindConditions, ObjectID, Repository } from 'typeorm'

export type Target<E> = TypeORM.EntityTarget<E>

export type AnyTarget = Target<any>

export namespace Extract {
  export type Entity<T extends AnyTarget> =
    T extends Target<infer E>
      ? E extends ObjectType<infer T>
        ? T
        : E extends EntitySchema<infer T>
          ? T
          : E extends { type: infer T; name: string; }
            ? T
            : {}
      : never

  export type Repo<T extends Target<any>> = Repository<Entity<T>>
  export type Request<H extends RequestHandler<any, any, any, any>> =
    H extends ( req: infer R ) => any ? R : never
  export type Response<H extends RequestHandler<any, any, any, any>> =
    H extends ( req: any, res: infer R ) => any ? R : never
}

export type Criteria<E extends AnyTarget> =
  | string | number | Date | ObjectID
  | string[] | number[] | Date[] | ObjectID[]
  | FindConditions<Extract.Entity<E>>
