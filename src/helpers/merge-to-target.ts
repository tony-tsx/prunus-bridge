import BridgeStatic from '../types/bridge-static'
import { query } from '../types/bridge-static-insert'
import { AnyTarget } from '../types/helpers'

const mergeToTarget = async <
    E extends AnyTarget, S extends { [key: string]: any }, I extends { [key: string]: any }>(
  bridge: BridgeStatic<E, S, I>,
  data: query<E> = {}
) => {
  const Target = await bridge.getTarget()
  return Object.assign( new Target(), data )
}

export default mergeToTarget
