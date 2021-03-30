import { DeleteResult, UpdateResult } from 'typeorm'

import { createBridgeMethodRequestUri } from '../../../helpers/createBridgeMethodRequestUri'
import { getBridgeOptions } from '../../../helpers/getBridgeOptions'
import { useTypeormSystemDelegate } from '../../../helpers/useTypeormSystemDelegate'
import { Bridge } from '../../../typings/bridge'

type Any = { [key: string]: any }

const _delete: Bridge.Static.Delete<any, Any, Any> = {
  async delete( criteria: Bridge.Helpers.Criteria<Any> ) {
    if ( getBridgeOptions( this ).deleteToSoft ) return this.softDelete( criteria )
    return useTypeormSystemDelegate( this, {
      system: repository => repository.delete( criteria ),
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'delete' )
        const response = await axios.delete<DeleteResult>( uri, { params: criteria } )
        return response.data
      },
    } )
  },
  async softDelete( criteria: Bridge.Helpers.Criteria<Any> ) {
    return useTypeormSystemDelegate( this, {
      system: repository => repository.softDelete( criteria ),
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'softDelete' )
        const response = await axios.delete<UpdateResult>( uri, { params: criteria } )
        return response.data
      },
    } )
  },
}

export { _delete }
