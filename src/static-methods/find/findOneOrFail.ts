import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindOneOptions } from '../../types/bridge-static-find'
import { AnyTarget, Extract } from '../../types/helpers'

const method = 'findOneOrFail' as const

const findOneOrFail = async function<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
>(
  this: BridgeStatic<E, S, I>,
  id: any,
  options: FindOneOptions<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { options, method }
    const response = await axios.get<Extract.Entity<E>>( `${this.uri}/${id}`, { params } )
    return this( response.data )
  }
  const repo = await this.getRepo()
  const entity = await repo.findOneOrFail( id, options )
  return this( entity )
}

export default findOneOrFail
