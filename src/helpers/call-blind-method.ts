import BlindMethod, { ExtractArgs, ExtractReturn } from '../types/blind-method'
import BridgeInstance from '../types/bridge-instance'
import { AnyTarget } from '../types/helpers'

const callBlindMethod = <B extends BlindMethod<any, any>, E extends AnyTarget, S = {}, I = {}>(
  bridge: BridgeInstance<E, S, I>,
  blind: B,
  ...args: ExtractArgs<B>
): ExtractReturn<B> => {
  if ( typeof window !== 'undefined' ) return blind.client( bridge, ...args )
  else return blind.server( bridge, ...args )
}

export default callBlindMethod
