import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { AnyTarget } from '../../types/helpers'

const method = 'count' as const

const count = async function<E extends AnyTarget, S = {}, I = {}>(
  this: BridgeStatic<E, S, I>,
  options: FindManyOptions<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { options, method }
    const response = await axios.get<number>( this.uri, { params } )
    return response.data
  }
  const repo = await this.getRepo()
  return repo.count( options )
}

export default count
