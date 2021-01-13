import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { query } from '../../types/bridge-static-insert'
import { AnyTarget, Extract } from '../../types/helpers'

const method = 'findByIdsAndUpdate' as const

const findByIdsAndUpdate = async function<E extends AnyTarget, S = {}, I = {}>(
  this: BridgeStatic<E, S, I>,
  ids: any[],
  options?: FindManyOptions<E>,
  data?: query<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { ids, options, method }
    const response = await axios.put<Extract.Entity<E>[]>( this.uri, data, { params } )
    return this( response.data )
  }
  const entities = await this.findByIds( ids, options )
  const promises = entities.map( entity => Object.assign( entity, data ).save() )
  return await Promise.all( promises )
}

export default findByIdsAndUpdate
