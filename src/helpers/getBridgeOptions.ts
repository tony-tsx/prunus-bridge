import { BRIDGE_IDENTIFY, factoryBridge } from '../factories/bridge'
import { records } from '../factories/bridge/records'
import { AnyBridge, AnyBridgeInstance, Bridge } from '../typings/bridge'

type BridgeOptions<T extends AnyBridge | AnyBridgeInstance> =
T extends Bridge<infer E, infer S, infer P>
  ? factoryBridge.Options<E, S, P>
  : T extends Bridge.Instance<infer E, infer S, infer P>
    ? factoryBridge.Options<E, S, P>
    : never

const getBridgeOptions = <T extends AnyBridge | AnyBridgeInstance>( bridge: T ): BridgeOptions<T> => {
  const record = records.find( bridge[BRIDGE_IDENTIFY] )
  if ( !record ) return null
  return record.options as any
}

export { getBridgeOptions }
