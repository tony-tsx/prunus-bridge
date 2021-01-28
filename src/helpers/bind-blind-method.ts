import BlindMethod, { ExtractArgs, ExtractReturn } from '../types/blind-method'
import BridgeInstance from '../types/bridge-instance'
import { AnyTarget } from '../types/helpers'
import callBlindMethod from './call-blind-method'

const bindBlindMethod = <
  M extends BlindMethod<any, any>, E extends AnyTarget, S extends { [key: string]: any } = {}, I extends { [key: string]: any } = {}
>( bridge: BridgeInstance<E, S, I>, blind: M ) =>
    ( ...args: ExtractArgs<M> ): ExtractReturn<M> =>
      callBlindMethod<M, E, S, I>( bridge, blind, ...args )

export default bindBlindMethod
