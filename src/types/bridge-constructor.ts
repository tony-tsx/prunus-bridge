import BridgeInstance from './bridge-instance'
import { query } from './bridge-static-insert'
import { AnyTarget } from './helpers'

namespace BridgeConstructor {}

interface BridgeConstructor<E extends AnyTarget, S = {}, I = {}> {
  new ( entity?: query<E> ): BridgeInstance<E, S, I>
  prototype: BridgeInstance<E, S, I>
}

export default BridgeConstructor
