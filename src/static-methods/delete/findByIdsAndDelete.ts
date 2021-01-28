import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { AnyTarget, Extract } from '../../types/helpers'

const method = 'findByIdsAndDelete' as const

const findByIdsAndDelete = async function<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
>(
  this: BridgeStatic<E, S, I>,
  ids: any[],
  options: FindManyOptions<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { ids, options, method }
    const response = await axios.delete<Extract.Entity<E>[]>( this.uri, { params } )
    return this( response.data )
  }
  const entities = await this.findByIds( ids, options )
  const promises = entities.map( entity => entity.remove() )
  return await Promise.all( promises )
}

export default findByIdsAndDelete
