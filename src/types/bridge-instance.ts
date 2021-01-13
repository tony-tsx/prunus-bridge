/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityTarget } from 'typeorm'

import BridgeInstanceMethod from './bridge-instance-method'
import BridgeInstanceProp from './bridge-instance-prop'
import { AnyTarget } from './helpers'

namespace BridgeInstance {
  export import Method = BridgeInstanceMethod
  export import Prop = BridgeInstanceProp
}

type AnyObject = { [key: string]: any }

export type AnyBridgeInstance = BridgeInstance<any, AnyObject, AnyObject>

type BridgeInstance<E extends AnyTarget, Static = {}, Instance = {}> =
  & ( Instance extends { [key: string]: any } ? Instance : {} )
  & BridgeInstance.Prop<E>
  & BridgeInstance.Method<E, Static, Instance>

export default BridgeInstance
