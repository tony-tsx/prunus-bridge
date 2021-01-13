import isClientSide from '../helpers/is-client-side'
import BridgeInstance from '../types/bridge-instance'
import { AnyTarget } from '../types/helpers'

const method = 'remove' as const

const remove = async function <E extends AnyTarget, S = {}, I = {}>( this: BridgeInstance<E, S, I> ) {
  if ( isClientSide() ) {
    const bridge = this.bridge()
    const axios = await bridge.getAxios()
    const params = { method }
    const response = await axios.delete( bridge.uri, { params } )
    return bridge( response.data )
  }
  const bridge = this.bridge()
  const repo = await this.bridge().getRepo()
  return bridge( await repo.remove( this ) )
}

export const description = {
  value: remove,
  enumerable: false,
  configurable: false,
  writable: false
} as PropertyDescriptor

export default remove
