import { AnyBridge } from '../typings/bridge'
import { getBridgeOptions } from './getBridgeOptions'
import { getExpress } from './internals/getExpress'

const getBridgeHandlers = <T extends AnyBridge>( bridge: T ) => {
  const handlers = getBridgeOptions( bridge ).routeOptions?.handlers ?? {}
  return Object.entries( handlers ).reduce( ( router, [ method, paths ] ) => {
    Object.entries( paths ).forEach( ( [ path, handler ] ) => {
      router[method]( path, handler )
    } )
    return router
  }, getExpress.sync().Router() )
}

export { getBridgeHandlers }
