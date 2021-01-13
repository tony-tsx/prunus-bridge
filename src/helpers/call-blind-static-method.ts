import BlindStaticMethod, { ExtractArgs, ExtractReturn } from '../types/blind-static-method'
import BridgeStatic from '../types/bridge-static'
import { AnyTarget } from '../types/helpers'

const callBlindStaticMethod = <B extends BlindStaticMethod<any, any>, E extends AnyTarget, S = {}, I = {}>(
  bridge: BridgeStatic<E, S, I>,
  blind: B,
  ...args: ExtractArgs<B>
): ExtractReturn<B> => {
  if ( typeof window !== 'undefined' ) return blind.client( bridge, ...args )
  else return blind.server( bridge, ...args )
}

export default callBlindStaticMethod
