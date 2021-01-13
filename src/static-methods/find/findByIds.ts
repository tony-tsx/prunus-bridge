import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { AnyTarget, Extract } from '../../types/helpers'

const method = 'findByIds' as const

const findByIds = async function<E extends AnyTarget, S = {}, I = {}>(
  this: BridgeStatic<E, S, I>,
  ids: any[],
  options: FindManyOptions<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { ids, options, method }
    const response = await axios.get<Extract.Entity<E>[]>( this.uri, { params } )
    return this( response.data )
  }
  const repo = await this.getRepo()
  const entities = await repo.findByIds( ids, options )
  return this( entities )
}

export default findByIds
