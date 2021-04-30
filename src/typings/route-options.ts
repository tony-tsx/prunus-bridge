import { RequestHandler, Router, Request, Response, NextFunction } from "express"
import { PathParams } from 'express-serve-static-core'
import { FindManyOptions, FindOneOptions, RemoveOptions, SaveOptions } from "typeorm"
import { AnyBridgeInstance, AnyBridgeStatic } from "./bridge"

interface RouteOptions extends globalThis.Prunus.RouteOptions {
  handlers?: RouteOptions.Handlers
  defaultOptions?: RouteOptions.DefaultsOptions
  
  beforeBridgeAttach?: ( router: Router ) => void
  afterBridgeAttach?: ( router: Router ) => void  
  beforeBridgeHandlersAttach?: ( router: Router ) => void
  afterBridgeHandlersAttach?: ( router: Router ) => void
  beforeStandardHandlersAttach?: ( router: Router ) => void
  afterStandardHandlersAttach?: ( router: Router ) => void
  afterSetup?: ( router: Router ) => void

  paths?: RouteOptions.RecordMethods<PathParams, true>
  middlewares?: RouteOptions.RecordMethods<RequestHandler, true>
  replaces?: RouteOptions.RecordMethods<RequestHandler, true>
  responses?: {
    [K in RouteOptions.MethodsNames]?: ( data: RouteOptions.Return<K>, req: Request, res: Response, next: NextFunction ) => void
  }
}

namespace RouteOptions {
  export type HandlersMiddlewares = {
    [K in keyof AnyBridgeStatic]?: RequestHandler
  }
  export type MethodsNames = keyof AnyBridgeStatic & keyof AnyBridgeInstance
  export type Return<T extends MethodsNames> =
    T extends keyof AnyBridgeStatic ?
      ReturnType<AnyBridgeStatic[T]> :
      T extends keyof AnyBridgeInstance ?
        ReturnType<AnyBridgeInstance[T]> : never
  export type RecordMethods<T, O extends boolean = false> = O extends true
    ? Partial<Record<MethodsNames, T>>
    : Record<MethodsNames, T>

  type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options'

  export type Handlers = Partial<
    Record<
      Methods,
      Record<string, RequestHandler<any, any, any, any>>
    >
  >

  export type DefaultsOptions = {
    save?: SaveOptions
    recover?: SaveOptions
    remove?: RemoveOptions
    softRemove?: SaveOptions

    find?: FindManyOptions
    findByIds?: FindManyOptions
    findOne?: FindOneOptions
    findOneOrFail?: FindOneOptions
    findAndCount?: FindManyOptions | FindOneOptions
  }
}

export { RouteOptions }

declare global {
  namespace Prunus {
    export interface RouteOptions {}
  }
  namespace Express {
    interface Request {
      routeOptions: RouteOptions
    }
  }
}