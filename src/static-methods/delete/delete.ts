import { DeleteResult } from 'typeorm'

import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { AnyTarget, Criteria } from '../../types/helpers'

const method = 'delete' as const

const _delete = async function<E extends AnyTarget, S = {}, I = {}>(
  this: BridgeStatic<E, S, I>,
  criteria: Criteria<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { criteria, method }
    const response = await axios.delete<DeleteResult>( this.uri, { params } )
    return response.data
  }
  const repo = await this.getRepo()
  const result = await repo.delete( criteria )
  return result
}

export default _delete
