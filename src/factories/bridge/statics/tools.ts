import { FindConditions, FindManyOptions, UpdateResult } from 'typeorm'

import { createBridgeMethodRequestUri } from '../../../helpers/createBridgeMethodRequestUri'
import { useTypeormSystemDelegate } from '../../../helpers/useTypeormSystemDelegate'
import { Bridge } from '../../../typings/bridge'

type Any = { [key: string]: any }

const tools: Bridge.Static.Tools<any, Any, Any> = {
  async clear() {
    return useTypeormSystemDelegate( this, {
      system: async repository => repository.clear(),
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'clear' )
        await axios.delete<UpdateResult>( uri )
      },
    } )
  },
  async count( optionOrConditions?: FindManyOptions<Any> | FindConditions<Any> ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => repository.count( optionOrConditions ),
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'count' )
        const response = await axios.get<number>( uri, { params: optionOrConditions } )
        return response.data
      },
    } )
  },
  async decrement( conditions: FindConditions<Any>, propertyPath: string, value: number | string ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => repository.decrement( conditions, propertyPath, value ),
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'decrement' )
        const params = { conditions, propertyPath, value }
        const response = await axios.patch<UpdateResult>( uri, { params } )
        return response.data
      },
    } )
  },
  async increment( conditions: FindConditions<Any>, propertyPath: string, value: number | string ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => repository.increment( conditions, propertyPath, value ),
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'increment' )
        const params = { conditions, propertyPath, value }
        const response = await axios.patch<UpdateResult>( uri, { params } )
        return response.data
      },
    } )
  },
}

export { tools }
