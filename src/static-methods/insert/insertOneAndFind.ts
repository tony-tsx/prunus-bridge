import isClientSide from '../../helpers/is-client-side'
import BridgeInstance from '../../types/bridge-instance'
import BridgeStatic from '../../types/bridge-static'
import { FindOneOptions } from '../../types/bridge-static-find'
import { query } from '../../types/bridge-static-insert'
import { AnyTarget } from '../../types/helpers'

const method = 'insertOneAndFind' as const

const insertOneAndFind = async function<E extends AnyTarget, S = {}, I = {}>(
  this: BridgeStatic<E, S, I>,
  data: query<E>,
  options?: FindOneOptions<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { method, options }
    const response = await axios.post<BridgeInstance<E, S, I>>( this.uri, data, { params } )
    return this( response.data )
  }
  const result = await this.insertOne( data )
  return await this.findOne( result.identifiers, options )
}

export default insertOneAndFind
