import { AnyBridge, AnyBridgeInstance } from '../typings/bridge'
import { getBridgeOptions } from './getBridgeOptions'
import { getAxios } from './internals/getAxios'

const getBridgeAxios = async <T extends AnyBridge | AnyBridgeInstance>( bridge: T ) => {
  const options = getBridgeOptions( bridge )
  return await options.getAxiosInstance?.() ?? await getAxios()
}

export { getBridgeAxios }
