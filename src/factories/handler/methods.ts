import { parseQueryRecursive as parse } from '../../helpers/parseQueryRecursive'
import { AnyBridge } from '../../typings/bridge'
import { RouteOptions } from '../../typings/route-options'

const save = async ( bridge: AnyBridge, query: any, body: any, params: any, routeOptions: RouteOptions ) => {
  query = parse( query )
  const defaultOption = routeOptions.defaultOptions?.['save'] ?? {}
  const options = Object.assign( {}, defaultOption, query )
  bridge( body ).save( options )
}
const recover = async ( bridge: AnyBridge, query: any, body: any, params: any, routeOptions: RouteOptions ) => {
  query = parse( query )
  const defaultOption = routeOptions.defaultOptions?.['recover'] ?? {}
  const options = Object.assign( {}, defaultOption, query )
  bridge( body ).recover( options )
}
const remove = async ( bridge: AnyBridge, query: any, body: any, params: any, routeOptions: RouteOptions ) => {
  query = parse( query )
  const defaultOption = routeOptions.defaultOptions?.['remove'] ?? {}
  const options = Object.assign( {}, defaultOption, query )
  bridge( body ).remove( options )
}

const softRemove = async ( bridge: AnyBridge, query: any, body: any, params: any, routeOptions: RouteOptions ) => {
  query = parse( query )
  const defaultOption = routeOptions.defaultOptions?.['softRemove'] ?? {}
  const options = Object.assign( {}, defaultOption, query )
  bridge( body ).softRemove( options )
}

export { save, recover, remove, softRemove }
