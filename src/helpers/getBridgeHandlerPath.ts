import humps from 'humps'

import { AnyBridge } from '../typings/bridge'
import { getBridgeOptions } from './getBridgeOptions'

const getBridgeHandlerPath = <T extends AnyBridge>( bridge: T ) => {
  const options = getBridgeOptions( bridge )
  const path = typeof options.uri === 'object'
    ? typeof options.uri.handler === 'string'
      ? options.uri.handler.startsWith( '/' ) ? options.uri.handler : `/${options.uri.handler}`
      : options.uri.handler
    : typeof options.uri === 'string'
      ? options.uri.startsWith( '/' ) ? options.uri : `/${options.uri}`
      : [
        `/${bridge.name}`,
        `/${humps.decamelize( bridge.name, { separator: '-' } )}`,
      ]
  return path
}

export { getBridgeHandlerPath }
