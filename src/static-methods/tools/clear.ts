import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { AnyTarget } from '../../types/helpers'

const method = 'clear' as const

const clear = async function<E extends AnyTarget, S = {}, I = {}>( this: BridgeStatic<E, S, I> ) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { method }
    const response = await axios.delete<void>( this.uri, { params } )
    return response.data
  }
  const repo = await this.getRepo()
  return repo.clear()
}

export default clear
