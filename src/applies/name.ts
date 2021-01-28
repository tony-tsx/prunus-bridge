import isClientSide from '../helpers/is-client-side'
import BridgeStatic from '../types/bridge-static'
import Config from '../types/config'
import { AnyTarget } from '../types/helpers'

const applyName = <
    E extends AnyTarget,
    S extends { [key: string]: any } = {},
    I extends { [key: string]: any } = {}
  >(
    bridge: BridgeStatic<E, S, I>,
    config: Config<E, S, I>
  ) => {
  if ( config.name )
    Object.defineProperty( bridge, 'name', { value: config.name } )

  else if ( !isClientSide() )
    config.target()
      .then(
        ( target: any ) => target.name && Object.defineProperty( bridge, 'name', { value: target.name } )
      )
      .then( () => Object.assign( bridge, { [Symbol.toStringTag]: `Bridge ${bridge.name}` } ) )

  Object.assign( bridge, { [Symbol.toStringTag]: `Bridge ${bridge.name}` } )
}

export default applyName
