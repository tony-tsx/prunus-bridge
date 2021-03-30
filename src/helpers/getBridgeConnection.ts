import { BRIDGE_IDENTIFY } from '../factories/bridge'
import { records } from '../factories/bridge/records'
import { AnyBridge, AnyBridgeInstance } from '../typings/bridge'
import { getTypeORM } from './internals/getTypeORM'
import { useTypeormSystem } from './useTypeormSystem'

const getBridgeConnection = async <T extends AnyBridge | AnyBridgeInstance>( bridge: T ) => {
  const record = records.find( bridge[BRIDGE_IDENTIFY] )
  if ( !record ) return null
  if ( !useTypeormSystem() ) throw new Error( '' )
  const options = record.options
  if ( options.getTypeORMConnection ) return await options.getTypeORMConnection()
  const typeorm = await getTypeORM()
  return typeorm.getConnection( options.connection )
}

export { getBridgeConnection }
