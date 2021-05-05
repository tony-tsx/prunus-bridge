import { FindManyOptions, FindOneOptions, InsertResult } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { createBridgeMethodRequestUri } from '../../../helpers/createBridgeMethodRequestUri'
import { useTypeormSystemDelegate } from '../../../helpers/useTypeormSystemDelegate'
import { Bridge } from '../../../typings/bridge'

type Any = { [key: string]: any }

const insert: Bridge.Static.Insert<{}, {}, {}> = {
  async insert( query: QueryDeepPartialEntity<Any> | QueryDeepPartialEntity<Any>[] ) {
    return useTypeormSystemDelegate( this, {
      system: repository => repository.insert( repository.create( query ) ),
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'insert' )
        const response = await axios.post<InsertResult>( uri, query )
        return response.data
      }
    } )
  },
  async insertOne( query: QueryDeepPartialEntity<Any> ) {
    return this.insert( Array.isArray( query ) ? query[0] : query )
  },
  async insertAndFind(
    query: QueryDeepPartialEntity<Any> | QueryDeepPartialEntity<Any>[],
    options?: FindManyOptions<Any>
  ) {
    return this.insert( query )
      .then( result => this.findByIds( result.identifiers, options ) )
  },
  async insertOneAndFind( query: QueryDeepPartialEntity<Any>, options?: FindOneOptions<Any> ) {
    return this.insertOne( query )
      .then( result => this.findOne( result.identifiers[0] as any, options ) )
  },
}

export { insert }
