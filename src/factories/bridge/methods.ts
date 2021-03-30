import { createBridgeMethodRequestUri } from '../../helpers/createBridgeMethodRequestUri'
import { useTypeormSystemDelegate } from '../../helpers/useTypeormSystemDelegate'
import { Bridge } from '../../typings/bridge'

type Any = { [key: string]: any }

const methods: Bridge.Instance.Methods<Any, Any, Any> = {
  async save( options ) {
    return useTypeormSystemDelegate( this, {
      system: async repository => {
        const entity = await repository.save( this, options )
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
        const entity = await repository.recover( this, options )
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
        const entity = await repository.remove( this, options )
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
        console.log( 'system softRemove options', options )
        const entity = await repository.softRemove( this, options )
        console.log( 'system softRemove result', entity )
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

Object.keys( methods ).forEach( key => {
  Object.defineProperty( methods, key, { writable: false, enumerable: false } )
} )

export { methods }
