import { RemoveOptions } from 'typeorm'

import isClientSide from '../helpers/is-client-side'
import BridgeInstance from '../types/bridge-instance'
import { AnyTarget } from '../types/helpers'

const method = 'remove' as const

const remove = async function <E extends AnyTarget, S = {}, I = {}>(
  this: BridgeInstance<E, S, I>,
  { listeners = true, transaction = false, ...restOptions }: RemoveOptions
) {
  const options = { listeners, transaction, ...restOptions }
  if ( isClientSide() ) {
    const bridge = this.bridge()
    const axios = await bridge.getAxios()
    const params = { method }
    await axios.delete( bridge.uri, { params, data: this } )
    return this
  }
  const repo = await this.bridge().getRepo()
  return await repo.remove( this as any, options )
}

export const description = {
  value: remove,
  enumerable: false,
  configurable: false,
  writable: false
} as PropertyDescriptor

export default remove
