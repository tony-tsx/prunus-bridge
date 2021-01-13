import isClientSide from '../helpers/is-client-side'
import BridgeInstance from '../types/bridge-instance'
import { AnyTarget } from '../types/helpers'

const method = 'softRemove' as const

const softRemove = async function <E extends AnyTarget, S = {}, I = {}>( this: BridgeInstance<E, S, I> ) {
  if ( isClientSide() ) {
    const bridge = this.bridge()
    const axios = await bridge.getAxios()
    const params = { method }
    const response = await axios.delete( bridge.uri, { params, data: this } )
    return bridge( response.data )
  }
  const repo = await this.bridge().getRepo()
  return await repo.softRemove( this )
}

export const description = {
  value: softRemove,
  enumerable: false,
  configurable: false,
  writable: false
} as PropertyDescriptor

export default softRemove
