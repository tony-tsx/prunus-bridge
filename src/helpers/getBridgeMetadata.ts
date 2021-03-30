import { AnyBridge } from '../typings/bridge'
import { getBridgeConnection } from './getBridgeConnection'
import { getBridgeOptions } from './getBridgeOptions'

const getBridgeMetadata = async <T extends AnyBridge>( bridge: T ) => {
  const options = getBridgeOptions( bridge )
  const connection = await getBridgeConnection( bridge )
  const meta = connection.getMetadata( await options.getTypeORMEntity() )
  return meta
}

export { getBridgeMetadata }
