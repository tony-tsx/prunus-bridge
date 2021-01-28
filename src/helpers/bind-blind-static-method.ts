import BlindStaticMethod, { ExtractArgs, ExtractReturn } from '../types/blind-static-method'
import BridgeStatic from '../types/bridge-static'
import callBlindStaticMethod from './call-blind-static-method'

const bindBlindStaticMethod = <
  B extends BridgeStatic<any, {}, {}
  >,
  M extends BlindStaticMethod<any, any>
>( bridge: B, blind: M ) =>
    ( ...args: ExtractArgs<M> ): ExtractReturn<M> =>
      callBlindStaticMethod( bridge, blind, ...args )

export default bindBlindStaticMethod
