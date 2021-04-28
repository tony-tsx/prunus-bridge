import { Request } from 'express'
import { handler } from '../..'
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

factoryHandler.matchWithChain = ( parameterKey: string | ( ( req: Request ) => any ) ) => {
  return getStandardBridgeRoute.match( parameterKey )
}

factoryHandler.match = <T extends AnyBridge>( parameterKey: string | ( ( req: Request ) => any ), bridge: T ) => {
  const handler = getExpress.sync().Router()
  handler.use( bridgeAttach( bridge ) )
  handler.use( getStandardBridgeRoute.match( parameterKey ) )
  return handler
}

declare namespace factoryHandler {}

export { factoryHandler }
