import humps from 'humps'

import { AnyBridge, AnyBridgeInstance } from '../typings/bridge'
import { getBridgeRequestUri } from './getBridgeRequestUri'

const createBridgeMethodRequestUri = <T extends AnyBridge | AnyBridgeInstance>( bridge: T, path: string ) =>
  `${getBridgeRequestUri( bridge )}/${humps.decamelize( path, { separator: '-' } )}`

export { createBridgeMethodRequestUri }
