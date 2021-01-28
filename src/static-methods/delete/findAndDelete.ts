import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { AnyTarget, Extract } from '../../types/helpers'

const method = 'findAndDelete' as const

const findAndDelete = async function<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
>(
  this: BridgeStatic<E, S, I>,
  options: FindManyOptions<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { options, method }
    const response = await axios.delete<Extract.Entity<E>[]>( this.uri, { params } )
    return this( response.data )
  }
  const entities = await this.find( options )
  const promises = entities.map( entity => entity.remove() )
  return await Promise.all( promises )
}

export default findAndDelete
