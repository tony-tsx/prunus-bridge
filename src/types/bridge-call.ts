import BridgeInstance from './bridge-instance'
import { query } from './bridge-static-insert'
import { AnyTarget, Extract } from './helpers'

namespace BridgeCall {
}

interface BridgeCall<E extends AnyTarget, S = {}, I = {}> {
  (): BridgeInstance<E, S, I>
  ( entity: query<E> | Extract.Entity<E> | undefined ): BridgeInstance<E, S, I>
  ( entities: ( query<E> | Extract.Entity<E> )[] ): BridgeInstance<E, S, I>[]
}

export default BridgeCall
