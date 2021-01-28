import { InsertResult } from 'typeorm'

import isClientSide from '../../helpers/is-client-side'
import mergeToTarget from '../../helpers/merge-to-target'
import BridgeStatic from '../../types/bridge-static'
import { query } from '../../types/bridge-static-insert'
import { AnyTarget } from '../../types/helpers'

const method = 'insert' as const

const insert = async function<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
>(
  this: BridgeStatic<E, S, I>,
  data: query<E>[]
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { method }
    const response = await axios.post<InsertResult>( this.uri, data, { params } )
    return response.data
  }
  const repo = await this.getRepo()
  return await repo.insert(
    await Promise.all(
      data.map( data => mergeToTarget( this, data ) )
    )
  )
}

export default insert
