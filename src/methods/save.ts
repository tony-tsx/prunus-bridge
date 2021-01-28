import { SaveOptions } from 'typeorm'

import isClientSide from '../helpers/is-client-side'
import BridgeInstance from '../types/bridge-instance'
import { AnyTarget } from '../types/helpers'

const method = 'save' as const

const save = async function<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
>(
  this: BridgeInstance<E, S, I>,
  { reload = true, transaction = false, listeners = true, ...restOptions }: SaveOptions = {}
) {
  const options = { reload, transaction, listeners, ...restOptions }
  if ( isClientSide() ) {
    const bridge = this.bridge()
    const axios = await bridge.getAxios()
    const params = { method, options }
    const response = await axios.put( bridge.uri, this, { params } )
    return Object.assign( this, response.data )
  }
  const repo = await this.bridge().getRepo()
  return await repo.save( this, options )
}

export const description = {
  value: save,
  enumerable: false,
  configurable: false,
  writable: false
} as PropertyDescriptor

export default save
