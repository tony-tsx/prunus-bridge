import isClientSide from '../../helpers/is-client-side'
import BridgeInstance from '../../types/bridge-instance'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { query } from '../../types/bridge-static-insert'
import { AnyTarget } from '../../types/helpers'

const method = 'insertAndFind' as const

const insertAndFind = async function<E extends AnyTarget, S = {}, I = {}>(
  this: BridgeStatic<E, S, I>,
  data: query<E>[],
  options?: Omit<FindManyOptions<E>, 'where'>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { method, options }
    const response = await axios.post<BridgeInstance<E, S, I>[]>( this.uri, data, { params } )
    return this( response.data )
  }
  const result = await this.insert( data )
  return await this.findByIds( result.identifiers, options )
}

export default insertAndFind
