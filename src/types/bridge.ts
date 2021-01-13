/* eslint-disable @typescript-eslint/no-unused-vars */
import BridgeInstance from './bridge-instance'
import BridgeStatic from './bridge-static'
import { AnyTarget } from './helpers'

namespace Bridge {
  export import Static = BridgeStatic
  export import Instance = BridgeInstance
}

export type AnyBridge = Bridge<AnyTarget, Record<string | number, any>, Record<string | number, any>>

type Bridge<E extends AnyTarget, S = {}, I = {}> = Bridge.Static<E, S, I>

export default Bridge
