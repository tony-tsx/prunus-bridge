import deep from '@cookiex/deep'

import BridgeStaticUpdate from '../../dist/types/bridge-static-update'
import { AnyBridge } from '../types/bridge'
import { AnyBridgeStaticMethods } from '../types/bridge-static'
import BridgeStaticFind, { FindManyOptions } from '../types/bridge-static-find'
import { AnyTarget } from '../types/helpers'

type AnyObject = { [key: string]: any }

const isParameters = <
  K extends keyof AnyBridgeStaticMethods
>( value: any ): value is Parameters<AnyBridgeStaticMethods[K]> => Array.isArray( value )

const isFunctionGenerateParameters = <
  K extends keyof AnyBridgeStaticMethods
>(
    value: any
  ): value is ( ...args: Parameters<AnyBridgeStaticMethods[K]> ) => Parameters<AnyBridgeStaticMethods[K]> =>
    typeof value === 'function'

export const getDefaultHandlerArguments = <K extends keyof AnyBridgeStaticMethods>(
  bridge: AnyBridge,
  method: K,
  ...args: Parameters<AnyBridgeStaticMethods[K]>
): Parameters<AnyBridgeStaticMethods[K]> => {
  const defaultArguments = bridge.config.handlerOptions?.defaults?.arguments?.[method]
  if ( isParameters<K>( defaultArguments ) ) return defaultArguments
  if ( isFunctionGenerateParameters<K>( defaultArguments ) ) defaultArguments( ...args )
  return [] as Parameters<AnyBridgeStaticMethods[K]>
}

export const mergeDefaultFindArguments = <K extends keyof AnyBridgeStaticMethods>(
  bridge: AnyBridge,
  method: K,
  ...args: Parameters<AnyBridgeStaticMethods[K]>
): Parameters<AnyBridgeStaticMethods[K]> => {
  type Params = Parameters<AnyBridgeStaticMethods[K]>
  const allowedFindMethods = [ 'find', 'findByIds', 'findOne', 'findOneOrFail', 'findAndCount', 'count' ]
  const findOneKeys = [ 'findOne', 'findOneOrFail' ]
  if ( !allowedFindMethods.includes( method ) )
    throw new Error( `method \`${method}\` not allowed to apply find options` )
  const defaultArguments = getDefaultHandlerArguments( bridge, method, ...args )
  if ( method === 'findByIds' ) {
    type Args = Parameters<BridgeStaticFind.findByIds<AnyTarget, AnyObject, AnyObject>>
    const [ defaultIds, defaultOptions = {} ] = defaultArguments as Args
    const [ argIds, argOptions = {} ] = args as Args
    return [ argIds || defaultIds, mergeToDefaultOptionFinds( bridge, argOptions, defaultOptions ) ] as Params
  }
  else if ( findOneKeys.includes( method ) ) {
    type Args = Parameters<BridgeStaticFind.findOne<AnyTarget, AnyObject, AnyObject>>
    const [ defaultId, defaultOptions = {} ] = defaultArguments as Args
    const [ argId, argOptions = {} ] = args as Args
    return [ defaultId || argId, deep( defaultOptions, argOptions ) ] as Params
  }
  else {
    type Args = Parameters<BridgeStaticFind.find<AnyTarget, AnyObject, AnyObject>>
    const [ defaultOptions = {} ] = defaultArguments as Args
    const [ argOptions = {} ] = args as Args
    return [ mergeToDefaultOptionFinds( bridge, argOptions, defaultOptions ) ] as Params
  }
}

export const mergeToDefaultOptionFinds = (
  bridge: AnyBridge,
  options: FindManyOptions<AnyTarget> = {},
  defaultOptions: FindManyOptions<AnyTarget> = {}
): FindManyOptions<AnyTarget> => {
  const maxTake = bridge.config.handlerOptions?.defaults?.finds?.maxTake ?? Infinity
  const defaultTake = bridge.config.handlerOptions?.defaults?.finds?.take
  const take = options.take >= maxTake ? maxTake : options.take || defaultTake
  return deep( defaultOptions, options, { take } )
}

export const applyDefaultFindOptions = <K extends keyof AnyBridgeStaticMethods>(
  bridge: AnyBridge,
  method: K,
  ...args: Parameters<AnyBridgeStaticMethods[K]>
): Parameters<AnyBridgeStaticMethods[K]> => mergeDefaultFindArguments( bridge, method, ...args )

export const applyDefaultCriteria = <K extends keyof AnyBridgeStaticMethods>(
  bridge: AnyBridge,
  method: K,
  ...args: Parameters<AnyBridgeStaticMethods[K]>
): Parameters<AnyBridgeStaticMethods[K]> => {
  type Params = Parameters<AnyBridgeStaticMethods[K]>
  const allowedFindMethods = [ 'delete', 'softDelete', 'update', 'restore' ]
  if ( !allowedFindMethods.includes( method ) )
    throw new Error( `method \`${method}\` not allowed to apply criteria` )
  const defaultArguments = getDefaultHandlerArguments( bridge, method, ...args )
  if ( method === 'update' ) {
    type Args = Parameters<BridgeStaticUpdate.update<AnyTarget>>
    const [ defaultCriteria, defaultData = {} ] = defaultArguments as Args
    const [ argCriteria, argData = {} ] = args as Args
    const data = deep( defaultData, argData )
    if ( typeof argCriteria === 'object' )
      if ( typeof defaultCriteria === 'object' )
        return [ deep( defaultCriteria, argCriteria ), data ] as Params
      else return [ argCriteria, data ] as Params
    return [ argCriteria || defaultCriteria, data ] as Params
  } else {
    type Args = Parameters<BridgeStaticUpdate.restore<AnyTarget>>
    const [ defaultCriteria ] = defaultArguments as Args
    const [ argCriteria ] = args as Args
    if ( typeof argCriteria === 'object' )
      if ( typeof defaultCriteria === 'object' )
        return [ deep( defaultCriteria, argCriteria ) ] as Params
      else return [ argCriteria ] as Params
    return [ argCriteria || defaultCriteria ] as Params
  }
}
