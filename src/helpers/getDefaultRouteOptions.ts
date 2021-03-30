import { AnyBridge } from '../typings/bridge'
import { BridgeOptions } from '../typings/bridge-options'
import { getBridgeOptions } from './getBridgeOptions'

const getDefaultRouteOptions = <
  B extends AnyBridge,
  K extends keyof BridgeOptions.Route.DefaultsOptions
>( bridge: B, key: K ): BridgeOptions.Route.DefaultsOptions[K] => {
  return getBridgeOptions( bridge ).routeOptions?.defaultOptions?.[key] ?? {}
}

export { getDefaultRouteOptions }
