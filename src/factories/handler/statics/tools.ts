import { getBridgeEntitySchemas as schemas } from '../../../helpers/getBridgeEntitySchemas'

import { parseQueryRecursive as parse } from '../../../helpers/parseQueryRecursive'
import { AnyBridge } from '../../../typings/bridge'
import { RouteOptions } from '../../../typings/route-options'

const clear = ( bridge: AnyBridge, query: any, body: any, params: any, options: RouteOptions ) => bridge.clear()

const count = ( bridge: AnyBridge, query: any, body: any, params: any , options: RouteOptions) =>
  schemas.findManyConditionsOrOptions( bridge )
    .then( schema => schema.validate( parse( query ) ) )
    .then( options => bridge.count( options ) )

const increment = ( bridge: AnyBridge, query: any, body: any, params: any, options: RouteOptions ) =>
  schemas.findConditions( bridge )
    .then( schema => schema.validate( parse( query.conditions ) ) )
    .then( conditions => conditions as any )
    .then( conditions => {
      const property = parse( query.propertyPath )
      const value = parse( query.value )
      return bridge.increment( conditions, property, value )
    } )
    
const decrement = ( bridge: AnyBridge, query: any, body: any, params: any, options: RouteOptions ) =>
  schemas.findConditions( bridge )
    .then( schema => schema.validate( parse( query.conditions ) ) )
    .then( conditions => conditions as any )
    .then( conditions => {
      const property = parse( query.propertyPath )
      const value = parse( query.value )
      return bridge.decrement( conditions, property, value )
    } )

export { count, clear, increment, decrement }
