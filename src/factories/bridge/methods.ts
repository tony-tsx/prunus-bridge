import { createBridgeMethodRequestUri } from '../../helpers/createBridgeMethodRequestUri'
import { extractKeys } from '../../helpers/extractKeys'
import { useTypeormSystemDelegate } from '../../helpers/useTypeormSystemDelegate'
import { Bridge } from '../../typings/bridge'

type Any = { [key: string]: any }

const methods: Bridge.Instance.Methods<Any, Any, Any> = {
  async save( options ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => {
        const entity = await repository.save( repository.create( this ), options )
        return Object.assign( this, entity )
      },
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'save' )
        const response = await axios.put<any>( uri, this, { params: options } )
        return Object.assign( this, response.data )
      },
    } )
  },
  async recover( options ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => {
        const entity = await repository.recover( repository.create( this ), options )
        return Object.assign( this, entity )
      },
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'recover' )
        const response = await axios.patch<any>( uri, this, { params: options } )
        return Object.assign( this, response.data )
      },
    } )
  },
  async remove( options ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => {
        const entity = await repository.remove( repository.create( this ), options )
        return Object.assign( this, entity )
      },
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'remove' )
        const response = await axios.delete<any>( uri, { params: options, data: this } )
        return Object.assign( this, response.data )
      },
    } )
  },
  async softRemove( options ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => {
        const entity = await repository.softRemove( repository.create( this ), options )
        return Object.assign( this, entity )
      },
      client: async axios => {
        const uri = createBridgeMethodRequestUri( this, 'softRemove' )
        const response = await axios.delete<any>( uri, { params: options, data: this } )
        return Object.assign( this, response.data )
      },
    } )
  }
}

const METHODS_KEYS = extractKeys( methods )

METHODS_KEYS.forEach( key => {
  Object.defineProperty( methods, key, { writable: false, enumerable: false } )
} )

export { methods, METHODS_KEYS }
