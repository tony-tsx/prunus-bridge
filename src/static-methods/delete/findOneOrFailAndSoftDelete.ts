import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { AnyTarget, Extract } from '../../types/helpers'

const method = 'findOneOrFailAndSoftDelete' as const

const findOneOrFailAndSoftDelete = async function<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
>(
  this: BridgeStatic<E, S, I>,
  id: any,
  options: FindManyOptions<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { options, method }
    const response = await axios.delete<Extract.Entity<E>>( `${this.uri}/${id}`, { params } )
    return this( response.data )
  }
  const entity = await this.findOneOrFail( id, options )
  return await entity.softRemove()
}

export default findOneOrFailAndSoftDelete
