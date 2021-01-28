import { AxiosInstance } from 'axios'
import { Repository } from 'typeorm'

import { AnyTarget, Extract } from './helpers'

namespace BridgeDelegations {
  export type getRepo<
    E extends AnyTarget> = () => Promise<Repository<Extract.Entity<E>>>
  export type getAxios = () => Promise<AxiosInstance>
  export type getTarget = () => Promise<new () => any>
}

interface BridgeDelegations<
    E extends AnyTarget> {
  getRepo: BridgeDelegations.getRepo<Extract.Entity<E>>
  getTarget: BridgeDelegations.getTarget
  getAxios: BridgeDelegations.getAxios
}
export default BridgeDelegations
