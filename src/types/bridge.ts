/* eslint-disable @typescript-eslint/no-unused-vars */
import BridgeInstance from './bridge-instance'
import BridgeStatic from './bridge-static'
import { AnyTarget } from './helpers'

namespace Bridge {
  export import Static = BridgeStatic
  export import Instance = BridgeInstance
}

export type AnyBridge = Bridge.Static<AnyTarget, unknown, unknown>

type Bridge<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
> = Bridge.Static<E, S, I>

export default Bridge
