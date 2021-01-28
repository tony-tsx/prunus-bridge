import { InsertResult } from 'typeorm'

import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { query } from '../../types/bridge-static-insert'
import { AnyTarget } from '../../types/helpers'

const method = 'insertOne' as const

const insertOne = async function<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
>(
  this: BridgeStatic<E, S, I>,
  data: query<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { method }
    const response = await axios.post<InsertResult>( this.uri, data, { params } )
    return response.data
  }
  return await this.insert( [ data ] )
}

export default insertOne
