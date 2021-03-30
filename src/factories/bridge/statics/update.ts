import { UpdateResult } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { createBridgeMethodRequestUri } from '../../../helpers/createBridgeMethodRequestUri'
import { useTypeormSystemDelegate } from '../../../helpers/useTypeormSystemDelegate'
import { Bridge } from '../../../typings/bridge'

type Any = { [key: string]: any }

const update: Bridge.Static.Update<any, Any, Any> = {
  async update( criteria: Bridge.Helpers.Criteria<Any>, partialEntity: QueryDeepPartialEntity<Any> ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => repository.update( criteria, partialEntity ),
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'update' )
        const response = await axios.patch<UpdateResult>( uri, partialEntity, { params: criteria } )
        return response.data
      },
    } )
  },
  async restore( criteria: Bridge.Helpers.Criteria<Any> ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => repository.restore( criteria ),
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'restore' )
        const response = await axios.patch<UpdateResult>( uri, null, { params: criteria } )
        return response.data
      },
    } )
  },
}

export { update }
