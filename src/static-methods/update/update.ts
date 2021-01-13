import { UpdateResult } from 'typeorm'

import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { query } from '../../types/bridge-static-insert'
import { AnyTarget, Criteria } from '../../types/helpers'

const method = 'update' as const

const update = async function<E extends AnyTarget, S = {}, I = {}>(
  this: BridgeStatic<E, S, I>,
  criteria: Criteria<E>,
  data: query<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { criteria, method }
    const response = await axios.put<UpdateResult>( this.uri, data, { params } )
    return response.data
  }
  const repo = await this.getRepo()
  const result = await repo.update( criteria, data )
  return result
}

export default update
