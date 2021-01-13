import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { query } from '../../types/bridge-static-insert'
import { AnyTarget, Extract } from '../../types/helpers'

const method = 'findOneOrFailAndUpdate' as const

const findOneOrFailAndUpdate = async function<E extends AnyTarget, S = {}, I = {}>(
  this: BridgeStatic<E, S, I>,
  id: any,
  options?: FindManyOptions<E>,
  data?: query<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { options, method }
    const response = await axios.put<Extract.Entity<E>>( `${this.uri}/${id}`, data, { params } )
    return this( response.data )
  }
  const entity = await this.findOneOrFail( id, options )
  return await Object.assign( entity, data ).save()
}

export default findOneOrFailAndUpdate
