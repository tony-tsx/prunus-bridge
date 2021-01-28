import { UpdateResult } from 'typeorm'

import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindConditions } from '../../types/bridge-static-find'
import { AnyTarget } from '../../types/helpers'

const method = 'decrement' as const

const decrement = async function<
  E extends AnyTarget,
  S extends { [key: string]: any } = {},
  I extends { [key: string]: any } = {}
>(
  this: BridgeStatic<E, S, I>,
  conditions: FindConditions<E>,
  property: string,
  value = 1
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { conditions, method }
    const response = await axios.get<UpdateResult>( this.uri, { params } )
    return response.data
  }
  const repo = await this.getRepo()
  return repo.decrement( conditions, property, value )
}

export default decrement
