import { AnyBridge } from "../typings/bridge"
import { getBridgeOptions } from "./getBridgeOptions"
import te2ys from 'te2ys'
import { getCustomBridgeOption as get } from "./customBridgeOption"
import { UpdateSchema } from "te2ys/dist/models/UpdateSchema"

const getConfig = async <T extends AnyBridge>( bridge: T ) => {
  const options = getBridgeOptions( bridge )
  const entity = await options.getTypeORMEntity()
  return [ entity, options.connection ] as const
}

const getBridgeEntitySchemas = async <T extends AnyBridge>( bridge: T ) => {
  const [ entity, connectionName ] = await getConfig( bridge )
  return get( bridge, 'entity-schema', () => te2ys( entity, { connectionName } ) )
}

getBridgeEntitySchemas.insert = async <T extends AnyBridge>( bridge: T ) => {
  const [ entity, connectionName ] = await getConfig( bridge )
  return get( bridge, 'entity-schema:insert', () => new te2ys.InsertSchema( entity, { connectionName } ) )
}

getBridgeEntitySchemas.insertOne = async <T extends AnyBridge>( bridge: T ) => {
  const [ entity, connectionName ] = await getConfig( bridge )
  return get( bridge, 'entity-schema:insert-one', () => new te2ys.InsertOneSchema( entity, { connectionName } ) )
}

getBridgeEntitySchemas.insertMany = async <T extends AnyBridge>( bridge: T ) => {
  const [ entity, connectionName ] = await getConfig( bridge )
  return get( bridge, 'entity-schema:insert-many', () => new te2ys.InsertManySchema( entity, { connectionName } ) )
}

getBridgeEntitySchemas.criteria = async <T extends AnyBridge>( bridge: T ) => {
  const [ entity, connectionName ] = await getConfig( bridge )
  return get( bridge, 'entity-schema:criteria', () => new te2ys.CriteriaSchema( entity, { connectionName } ) )
}

getBridgeEntitySchemas.findOneConditionsOrOptions = async <T extends AnyBridge>( bridge: T ) => {
  const [ entity, connectionName ] = await getConfig( bridge )
  return get( bridge, 'entity-schema:find-one-conditions-or-options', () => new te2ys.FindOneConditionsOrOptionsSchema( entity, { connectionName } ) )
}

getBridgeEntitySchemas.findManyConditionsOrOptions = async <T extends AnyBridge>( bridge: T ) => {
  const [ entity, connectionName ] = await getConfig( bridge )
  return get( bridge, 'entity-schema:find-many-conditions-or-options', () => new te2ys.FindManyConditionsOrOptionsSchema( entity, { connectionName } ) )
}

getBridgeEntitySchemas.findOneOptions = async <T extends AnyBridge>( bridge: T ) => {
  const [ entity, connectionName ] = await getConfig( bridge )
  return get( bridge, 'entity-schema:find-one-options', () => new te2ys.FindOneOptionsSchema( entity, { connectionName } ) )
}

getBridgeEntitySchemas.findManyOptions = async <T extends AnyBridge>( bridge: T ) => {
  const [ entity, connectionName ] = await getConfig( bridge )
  return get( bridge, 'entity-schema:find-many-options', () => new te2ys.FindManyOptionsSchema( entity, { connectionName } ) )
}

getBridgeEntitySchemas.findConditions = async <T extends AnyBridge>( bridge: T ) => {
  const [ entity, connectionName ] = await getConfig( bridge )
  return get( bridge, 'entity-schema:find-conditions', () => new te2ys.FindConditionsSchema( entity, { connectionName } ) )
}

getBridgeEntitySchemas.update = async <T extends AnyBridge>( bridge: T ) => {
  const [ entity, connectionName ] = await getConfig( bridge )
  return get( bridge, 'entity-schema:update', () => new UpdateSchema( entity, { connectionName } ) )
}

export { getBridgeEntitySchemas }
