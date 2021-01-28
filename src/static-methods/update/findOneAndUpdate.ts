import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { query } from '../../types/bridge-static-insert'
import { AnyTarget, Extract } from '../../types/helpers'

const method = 'findOneAndUpdate' as const

const findOneAndUpdate = async function<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
>(
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
  const entity = await this.findOne( id, options )
  return await Object.assign( entity, data ).save()
}

export default findOneAndUpdate
