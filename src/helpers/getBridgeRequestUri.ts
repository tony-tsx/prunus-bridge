import humps from 'humps'

import { AnyBridge, AnyBridgeInstance } from '../typings/bridge'
import { getBridgeOptions } from './getBridgeOptions'

const getBridgeRequestUri = <T extends AnyBridge | AnyBridgeInstance>( bridge: T ): string => {
  const options = getBridgeOptions( bridge )
  if ( options.uri ) return options.uri
  return options.uri = humps.depascalize( options.name, { separator: '-' } )
}

export { getBridgeRequestUri }
