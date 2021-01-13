import isClientSide from '../helpers/is-client-side'
import BridgeInstance from '../types/bridge-instance'
import { AnyTarget } from '../types/helpers'

const method = 'recovery' as const

const recovery = async function <E extends AnyTarget, S = {}, I = {}>( this: BridgeInstance<E, S, I> ) {
  if ( isClientSide() ) {
    const bridge = this.bridge()
    const axios = await bridge.getAxios()
    const params = { method }
    const response = await axios.put( bridge.uri, this, { params } )
    return bridge( response.data )
  }
  const repo = await this.bridge().getRepo()
  return await repo.recover( this, { reload: true } )
}

export const description = {
  value: recovery,
  enumerable: false,
  configurable: false,
  writable: false
} as PropertyDescriptor

export default recovery
