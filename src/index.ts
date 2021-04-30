/* eslint-disable @typescript-eslint/no-unused-vars */
import { factoryBridge } from './factories/bridge'
import { factoryCommand } from './factories/command'
import { factoryHandler } from './factories/handler'
import { factorySeeder } from './factories/seeder'
import * as BridgeHelpers from './helpers'
import { Operators as BridgeOperators } from './tools/operators'
import {
  Bridge as BridgeTypings,
  AnyBridge as TAnyBridge,
  AnyBridgeInstance as TAnyBridgeInstance
} from './typings/bridge'
import { BridgeOptions } from './typings/bridge-options'

namespace Bridge {
  export type AnyBridge = TAnyBridge
  export type AnyBridgeInstance = TAnyBridgeInstance

  export import Option = BridgeOptions
  export import create = factoryBridge
  export import handler = factoryHandler
  export import command = factoryCommand
  export import seeder = factorySeeder

  export import Operators = BridgeOperators
  export import Helpers = BridgeHelpers
  export import Typings = BridgeTypings
}

type Bridge<E, S, P> = BridgeTypings<E, S, P>

export = Bridge

declare global {
  export namespace Express {
    export interface Request {
      bridge: Bridge.AnyBridge
      entity?: Bridge.AnyBridgeInstance | null | undefined
    }
  }
}

const B = Bridge.create( {
  name: 'Test',
  getTypeORMEntity: async () => class T {}
} )
Bridge.handler( B, {
  responses: {
    find: ( response, req, res, next ) => {},
  }
} )
