import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { AnyTarget, Extract } from '../../types/helpers'

const method = 'findAndRestore' as const

const findAndRestore = async function<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
>(
  this: BridgeStatic<E, S, I>,
  options?: FindManyOptions<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { options, method }
    const response = await axios.put<Extract.Entity<E>[]>( this.uri, {}, { params } )
    return this( response.data )
  }
  const entities = await this.find( options )
  const promises = entities.map( entity => entity.recovery() )
  return await Promise.all( promises )
}

export default findAndRestore
