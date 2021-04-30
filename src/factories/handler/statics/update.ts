import { getBridgeEntitySchemas as schemas } from '../../../helpers/getBridgeEntitySchemas'

import { AnyBridge } from '../../../typings/bridge'
import { RouteOptions } from '../../../typings/route-options'

const update = ( bridge: AnyBridge, query: any, body: any, params: any, options: RouteOptions ) =>
  Promise.all( [ schemas.criteria( bridge ), schemas.update( bridge ) ] )
    .then( ( [ criteriaSchema, updateSchema ] ) => Promise.all( [
      criteriaSchema.validate( query ),
      updateSchema.validate( body )
    ] ) )
    .then( ( [ criteria, update ] ) => bridge.update( criteria, update as any ) )

const restore = ( bridge: AnyBridge, query: any, body: any, params: any, options: RouteOptions ) =>
  schemas.criteria( bridge )
    .then( schema => schema.validate( query ) )
    .then( query => bridge.restore( query ) )

export { update, restore }
