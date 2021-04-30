import { NotFound } from 'http-errors'
import { FindManyOptions } from 'typeorm'
import { getBridgeEntitySchemas as schemas } from '../../../helpers/getBridgeEntitySchemas'

import { getTypeORMFindOptionsUtils } from '../../../helpers/internals/getTypeORMFindOptionsUtils'
import { parseQueryRecursive as parse } from '../../../helpers/parseQueryRecursive'
import { processUnionOptions as union } from '../../../helpers/processUnionOptions'
import { AnyBridge } from '../../../typings/bridge'
import { RouteOptions } from '../../../typings/route-options'

const find = async ( bridge: AnyBridge, query: any, body: any, params: any, routeOptions: RouteOptions ) => {
  const defaultOptions = routeOptions.defaultOptions?.['find'] ?? {}
  const receiveOptions = parse( query )
  const options = union( defaultOptions, receiveOptions ) as FindManyOptions
  return schemas.findManyConditionsOrOptions( bridge )
    .then( schema => schema.validate( options ) )
    .then( options => bridge.find( options ) )
}

const findAndCount = async ( bridge: AnyBridge, query: any, body: any, params: any, routeOptions: RouteOptions ) => {
  const defaultOptions = routeOptions.defaultOptions?.['findAndCount'] ?? {}
  const receiveOptions = parse( query )
  const options = union( defaultOptions, receiveOptions ) as FindManyOptions
  return schemas.findManyConditionsOrOptions( bridge )
    .then( schema => schema.validate( options ) )
    .then( options => bridge.findAndCount( options ) )
}

const findByIds = async ( bridge: AnyBridge, query: any, body: any, params: any, routeOptions: RouteOptions ) => {
  const defaultOptions = routeOptions.defaultOptions?.['findByIds'] ?? {}
  const ids = query?.ids ?? []
  const receiveOptions = parse( query.optionsOrConditions )
  const options = union( defaultOptions, receiveOptions ) as FindManyOptions
  return schemas.findManyConditionsOrOptions( bridge )
    .then( schema => schema.validate( options ) )
    .then( options => bridge.findByIds( ids, options ) )
}

const findOne = async ( bridge: AnyBridge, query: any, body: any, params: any, routeOptions: RouteOptions ) => {
  const { FindOptionsUtils } = getTypeORMFindOptionsUtils.sync()
  const defaultOptions = routeOptions.defaultOptions?.['findOne'] ?? {}
  const receiveOptions1 = parse( query.idOrOptionsOrConditions )
  const receiveOptions2 = parse( query.options )
  const options =
    FindOptionsUtils.isFindOneOptions( receiveOptions1 )
      ? union( defaultOptions, receiveOptions1 )
      : union( defaultOptions, receiveOptions2 )

  return schemas.findOneConditionsOrOptions( bridge )
    .then( schema => schema.validate( options ) )
    .then( options => !FindOptionsUtils.isFindOneOptions( receiveOptions1 )
      ? bridge.findOne( receiveOptions1 as any, options )
      : bridge.findOne( options )
    )
}

const findOneOrFail = async ( bridge: AnyBridge, query: any, body: any, params: any, routeOptions: RouteOptions ) => {
  const { FindOptionsUtils } = getTypeORMFindOptionsUtils.sync()
  const defaultOptions = routeOptions.defaultOptions?.['findOneOrFail'] ?? {}
  const receiveOptions1 = parse( query.idOrOptionsOrConditions )
  const receiveOptions2 = parse( query.options )
  const options =
    FindOptionsUtils.isFindOneOptions( receiveOptions1 )
      ? union( defaultOptions, receiveOptions1 )
      : union( defaultOptions, receiveOptions2 )

  return schemas.findOneConditionsOrOptions( bridge )
    .then( schema => schema.validate( options ) )
    .then( options => !FindOptionsUtils.isFindOneOptions( receiveOptions1 )
      ? bridge.findOne( receiveOptions1 as any, options )
      : bridge.findOne( options )
    )
    .then( single => {
      if ( !single ) return Promise.reject( new NotFound( `${bridge.name} not found` ) )
      return single
    } )
}

export { find, findOne, findOneOrFail, findByIds, findAndCount }
