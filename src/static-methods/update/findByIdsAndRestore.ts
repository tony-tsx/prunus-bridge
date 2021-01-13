import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { AnyTarget, Extract } from '../../types/helpers'

const method = 'findByIdsAndRestore' as const

const findByIdsAndRestore = async function<E extends AnyTarget, S = {}, I = {}>(
  this: BridgeStatic<E, S, I>,
  ids: any[],
  options?: FindManyOptions<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { ids, options, method }
    const response = await axios.put<Extract.Entity<E>[]>( this.uri, {}, { params } )
    return this( response.data )
  }
  const entities = await this.findByIds( ids, options )
  const promises = entities.map( entity => entity.recovery() )
  return await Promise.all( promises )
}

export default findByIdsAndRestore
