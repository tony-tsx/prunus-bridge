
import { bridgeAttach } from '../../handlers/helpers'
import { getBridgeHandlerPath } from '../../helpers/getBridgeHandlerPath'
import { getBridgeHandlers } from '../../helpers/getBridgeHandlers'
import { getExpress } from '../../helpers/internals/getExpress'
import { getStandardBridgeRoute } from '../../helpers/internals/getStandardBridgeRoute'
import { AnyBridge } from '../../typings/bridge'
import { factoryAllBridgeHandler } from './all'

const factoryHandler = <T extends AnyBridge>( bridge: T ) => {
  const handler = getExpress.sync().Router()
  const path = getBridgeHandlerPath( bridge )
  handler.use( path, bridgeAttach( bridge ) )
  handler.use( path, getBridgeHandlers( bridge ) )
  handler.use( path, getStandardBridgeRoute() )
  return handler
}

factoryHandler.all = factoryAllBridgeHandler

declare namespace factoryHandler {}

export { factoryHandler }
