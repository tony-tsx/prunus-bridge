import Axios from 'axios'

import { AnyBridge, AnyBridgeInstance } from '../typings/bridge'
import { getBridgeOptions } from './getBridgeOptions'

const getBridgeAxios = async <T extends AnyBridge | AnyBridgeInstance>( bridge: T ) => {
  const options = getBridgeOptions( bridge )
  return await options.getAxiosInstance?.() ?? Axios
}

export { getBridgeAxios }
