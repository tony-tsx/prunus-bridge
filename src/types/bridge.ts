/* eslint-disable @typescript-eslint/no-unused-vars */
import BridgeInstance from './bridge-instance'
import BridgeStatic from './bridge-static'
import { AnyTarget } from './helpers'

namespace Bridge {
  export import Static = BridgeStatic
  export import Instance = BridgeInstance
}

type AnyObject = { [key: string]: any }

export type AnyBridge = Bridge<any, AnyObject, AnyObject>

type Bridge<E extends AnyTarget, S = {}, I = {}> = Bridge.Static<E, S, I>

export default Bridge
