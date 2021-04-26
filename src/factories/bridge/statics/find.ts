import { FindConditions, FindManyOptions, FindOneOptions, ObjectID } from 'typeorm'

import { createBridgeMethodRequestUri } from '../../../helpers/createBridgeMethodRequestUri'
import { useTypeormSystemDelegate } from '../../../helpers/useTypeormSystemDelegate'
import { Bridge } from '../../../typings/bridge'

type Any = { [key: string]: any }

const find: Bridge.Static.Find<any, Any, Any> = {
  async find( optionsOrConditions: FindManyOptions<Any> | FindConditions<Any> ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => {
        const entities = await repository.find( optionsOrConditions )
        return this( entities )
      },
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'find' )
        const response = await axios.get<any[]>( uri, { params: optionsOrConditions } )
        return this( response.data )
      }
    } )
  },
  async findAndCount( optionsOrConditions: FindManyOptions<Any> | FindConditions<Any> ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => {
        const [ entities, count ] = await repository.findAndCount( optionsOrConditions )
        return [ this( entities ), count ] as const
      },
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'findAndCount' )
        const { data: [ entities, count ] } = await axios.get<[ any[], number ]>( uri, { params: optionsOrConditions } )
        return [ this( entities ), count ] as const
      }
    } )
  },
  async findByIds( ids: any[], optionsOrConditions?: FindManyOptions<Any> | FindConditions<Any> ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => {
        const entities = await repository.findByIds( ids, optionsOrConditions )
        return this( entities )
      },
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'findByIds' )
        const params = { ids, optionsOrConditions }
        const { data: entities } = await axios.get<[ any[], number ]>( uri, { params } )
        return this( entities )
      }
    } )
  },
  async findOne(
    idOrOptionsOrConditions?: string | number | Date | ObjectID | FindOneOptions<Any> | FindConditions<Any>,
    options?: FindOneOptions<Any>
  ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => {
        const entity = await repository.findOne( idOrOptionsOrConditions as any, options )
        if ( !entity ) return entity
        return this( entity )
      },
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'findOne' )
        const { data: entity } = await axios.get( uri, {
          params: { idOrOptionsOrConditions, options },
          validateStatus: status => status < 300 || status === 404
        } )
        if ( !entity ) return null
        return this( entity )
      },
    } )
  },
  async findOneOrFail(
    idOrOptionsOrConditions?: string | number | Date | ObjectID | FindOneOptions<Any> | FindConditions<Any>,
    options?: FindOneOptions<Any>
  ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => {
        const entity = await repository.findOneOrFail( idOrOptionsOrConditions as any, options )
        return this( entity )
      },
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'findOneOrFail' )
        const { data: entity } = await axios.get( uri, { params: { idOrOptionsOrConditions, options } } )
        return this( entity )
      },
    } )
  },
}

export { find }
