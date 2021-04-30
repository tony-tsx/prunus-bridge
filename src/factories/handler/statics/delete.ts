import { getBridgeEntitySchemas as schemas } from '../../../helpers/getBridgeEntitySchemas'

import { AnyBridge, Bridge } from '../../../typings/bridge'
import { RouteOptions } from '../../../typings/route-options'

const _delete = ( bridge: AnyBridge, query: any, body: any, params: any, options: RouteOptions ) =>
  schemas.criteria( bridge )
    .then( schema => schema.validate( query ) )
    .then( query => bridge.delete( query ) )

const softDelete = ( bridge: AnyBridge, query: any, body: any, params: any, options: RouteOptions ) =>
  schemas.criteria( bridge )
    .then( schema => schema.validate( query ) )
    .then( query => bridge.softDelete( query ) )

export { _delete as delete, softDelete }
