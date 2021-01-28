import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { AnyTarget, Extract } from '../../types/helpers'

const method = 'find' as const

const find = async function<
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
    const response = await axios.get<Extract.Entity<E>[]>( this.uri, { params } )
    return this( response.data )
  }
  const repo = await this.getRepo()
  const entities = await repo.find( options )
  return this( entities )
}

export default find
