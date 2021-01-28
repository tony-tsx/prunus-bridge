import { RequestHandler } from 'express'
import { FindConditions, ObjectID, Repository } from 'typeorm'

export type Target<E> =
  E extends new ( ...args: any[] ) => any
    ? E
    : new ( ...args: any[] ) => E

export type AnyTarget = new ( ...args: any[] ) => any

export namespace Extract {
  export type Entity<T extends AnyTarget> =
    T extends Target<infer E>
      ? E extends new ( ...args: any[] ) => infer T ? T : never
      : never

  export type Repo<T extends AnyTarget> = Repository<
    Entity<T>>

  export type Request<H extends RequestHandler<any, any, any, any>> =
    H extends ( req: infer R ) => any ? R : never

  export type Response<H extends RequestHandler<any, any, any, any>> =
    H extends ( req: any, res: infer R ) => any ? R : never
}

export type Criteria<
    E extends AnyTarget> =
  | string | number | Date | ObjectID
  | string[] | number[] | Date[] | ObjectID[]
  | FindConditions<Extract.Entity<E>>
