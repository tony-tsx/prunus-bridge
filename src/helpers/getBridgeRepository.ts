import { Repository } from 'typeorm'

import { AnyBridge, AnyBridgeInstance, Bridge } from '../typings/bridge'
import { getBridgeConnection } from './getBridgeConnection'
import { getBridgeOptions } from './getBridgeOptions'

type BridgeRepository<T extends AnyBridge | AnyBridgeInstance> =
  T extends AnyBridge
    ? Bridge.Extractors.Repository<T>
    : T extends Bridge.Instance<infer E, any, any>
      ? Repository<E>
      : never

const getBridgeRepository = async <T extends AnyBridge | AnyBridgeInstance>(
  bridge: T
): Promise<BridgeRepository<T>> => {
  const options = getBridgeOptions( bridge )
  const connection = await getBridgeConnection( bridge )
  return connection.getRepository( await options.getTypeORMEntity() ) as any
}

export { getBridgeRepository }
