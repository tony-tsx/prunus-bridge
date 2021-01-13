import BridgeStatic from '../types/bridge-static'

const isClientSide = ( _bridge?: BridgeStatic<any, any, any> ) =>
  typeof window !== 'undefined'

export default isClientSide
