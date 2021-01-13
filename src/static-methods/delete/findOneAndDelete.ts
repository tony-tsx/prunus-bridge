import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { AnyTarget, Extract } from '../../types/helpers'

const method = 'findOneAndDelete' as const

const findOneAndDelete = async function<E extends AnyTarget, S = {}, I = {}>(
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
  const entity = await this.findOne( id, options )
  return await entity.remove()
}

export default findOneAndDelete
