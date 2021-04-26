import { AnyBridge } from "../typings/bridge";
import { getBridgeOptions } from "./getBridgeOptions";

const setCustomBridgeOption = <T extends AnyBridge, V>( bridge: T, key: string, value: V ) => {
  Object.assign( getBridgeOptions( bridge ), { [key]: value } )
  return value
}

const getCustomBridgeOption = <T extends AnyBridge, V>( bridge: T, key: string, defaultValue?: () => V ): V => {
  const options = getBridgeOptions( bridge )
  if ( !( key in options ) && defaultValue ) return setCustomBridgeOption( bridge, key, defaultValue() )
  return options[key]
}

export { getCustomBridgeOption, setCustomBridgeOption }