import { AxiosInstance } from 'axios'
import { Repository } from 'typeorm'

import { AnyTarget, Extract } from './helpers'

namespace BridgeDelegations {
  export type getRepo<E extends AnyTarget> = () => Promise<Repository<Extract.Entity<E>>>
  export type getAxios = () => Promise<AxiosInstance>
}

interface BridgeDelegations<E extends AnyTarget> {
  getRepo: BridgeDelegations.getRepo<Extract.Entity<E>>
  getAxios: BridgeDelegations.getAxios
}
export default BridgeDelegations
