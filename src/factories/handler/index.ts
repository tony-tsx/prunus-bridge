
import { bridgeAttach } from '../../handlers/helpers'
import { getBridgeHandlers } from '../../helpers/getBridgeHandlers'
import { getExpress } from '../../helpers/internals/getExpress'
import { getStandardBridgeRoute } from '../../helpers/internals/getStandardBridgeRoute'
import { AnyBridge } from '../../typings/bridge'
import { factoryAllBridgeHandler } from './all'

const factoryHandler = <T extends AnyBridge>( bridge: T ) => {
  const handler = getExpress.sync().Router()
  handler.use( bridgeAttach( bridge ) )
  handler.use( getBridgeHandlers( bridge ) )
  handler.use( getStandardBridgeRoute() )
  return handler
}

factoryHandler.all = factoryAllBridgeHandler

declare namespace factoryHandler {}

export { factoryHandler }
