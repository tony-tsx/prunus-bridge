import { AxiosInstance } from 'axios'

import { AnyBridge, AnyBridgeInstance, Bridge } from '../typings/bridge'
import { getBridgeAxios } from './getBridgeAxios'
import { getBridgeRepository } from './getBridgeRepository'
import { useTypeormSystem } from './useTypeormSystem'

const useTypeormSystemDelegate = async <T extends AnyBridge | AnyBridgeInstance, R>(
  bridge: T,
  delegate: useTypeormSystemDelegate.Delegate<T, R>
) => {
  if ( useTypeormSystem() ) 
    return delegate.system( await getBridgeRepository( bridge ) as Bridge.Extractors.Repository<T> )
  else return delegate.client( await getBridgeAxios( bridge ) )
}

declare namespace useTypeormSystemDelegate {
  export interface Delegate<T extends AnyBridge | AnyBridgeInstance, R> {
    system: ( repository: Bridge.Extractors.Repository<T> ) => R,
    client: ( axios: AxiosInstance ) => R
  }
}

export { useTypeormSystemDelegate }
