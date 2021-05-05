import { Request, Response, NextFunction } from 'express'
import { FindManyOptions } from 'typeorm'
import { getBridgeEntitySchemas as schemas } from '../../../helpers/getBridgeEntitySchemas'

import { getTypeORMFindOptionsUtils } from '../../../helpers/internals/getTypeORMFindOptionsUtils'
import { parseQueryRecursive as parse } from '../../../helpers/parseQueryRecursive'
import { processUnionOptions as union } from '../../../helpers/processUnionOptions'
import { AnyBridge } from '../../../typings/bridge'
import { RouteOptions } from '../../../typings/route-options'

const find = async ( bridge: AnyBridge, req: Request<any, any, any, any>, res: Response, next: NextFunction, routeOptions: RouteOptions ) => {
  const defaultOptions = routeOptions.defaultOptions?.['find'] ?? {}
  const receiveOptions = parse( req.query )
  const options = union( defaultOptions, receiveOptions ) as FindManyOptions
  const schema = routeOptions.schemas?.find ? Promise.resolve( routeOptions.schemas.find ) : schemas.findManyConditionsOrOptions( bridge )
  return schema
    .then( schema => schema.validate( options ) )
    .then( options => {
      if ( routeOptions.interceptors?.find )
        return routeOptions.interceptors.find( [ options ], req, res, next )
      return bridge.find( options )
    } )
}

const findAndCount = async ( bridge: AnyBridge, req: Request<any, any, any, any>, res: Response, next: NextFunction, routeOptions: RouteOptions ) => {
  const defaultOptions = routeOptions.defaultOptions?.['findAndCount'] ?? {}
  const receiveOptions = parse( req.query )
  const options = union( defaultOptions, receiveOptions ) as FindManyOptions
  return schemas.findManyConditionsOrOptions( bridge )
    .then( schema => schema.validate( options ) )
    .then( options => {
      if ( routeOptions.interceptors?.findAndCount )
        return routeOptions.interceptors.findAndCount( [ options ], req, res, next )
      return bridge.findAndCount( options )
    } )
}

const findByIds = async ( bridge: AnyBridge, req: Request<any, any, any, any>, res: Response, next: NextFunction, routeOptions: RouteOptions ) => {
  const defaultOptions = routeOptions.defaultOptions?.['findByIds'] ?? {}
  const ids = parse( req.query?.ids ?? [] )
  const receiveOptions = parse( req.query.optionsOrConditions )
  const options = union( defaultOptions, receiveOptions ) as FindManyOptions
  return schemas.findManyConditionsOrOptions( bridge )
    .then( schema => schema.validate( options ) )
    .then( options => {
      if ( routeOptions.interceptors?.findByIds )
        return routeOptions.interceptors.findByIds( [ ids, options ], req, res, next )
      return bridge.findByIds( ids, options )
    } )
}

const findOne = async ( bridge: AnyBridge, req: Request<any, any, any, any>, res: Response, next: NextFunction, routeOptions: RouteOptions ) => {
  const { FindOptionsUtils } = getTypeORMFindOptionsUtils.sync()
  const defaultOptions = routeOptions.defaultOptions?.['findOne'] ?? {}
  const receiveOptions1 = parse( req.query.idOrOptionsOrConditions )
  const receiveOptions2 = parse( req.query.options )
  const options =
    FindOptionsUtils.isFindOneOptions( receiveOptions1 )
      ? union( defaultOptions, receiveOptions1 )
      : union( defaultOptions, receiveOptions2 )

  return schemas.findOneConditionsOrOptions( bridge )
    .then( schema => schema.validate( options ) )
    .then( options => {
      return !FindOptionsUtils.isFindOneOptions( receiveOptions1 )
        ? routeOptions.interceptors?.findOne
          ? routeOptions.interceptors.findOne( [ receiveOptions1 as any, options ], req, res, next )
          : bridge.findOne( receiveOptions1 as any, options )
        : routeOptions.interceptors?.findOne
          ? routeOptions.interceptors.findOne( [ options ], req, res, next )
          : bridge.findOne( options )
    } )
    .then( options => !FindOptionsUtils.isFindOneOptions( receiveOptions1 )
      ? bridge.findOne( receiveOptions1 as any, options )
      : bridge.findOne( options )
    )
}

const findOneOrFail = async ( bridge: AnyBridge, req: Request<any, any, any, any>, res: Response, next: NextFunction, routeOptions: RouteOptions ) => {
  const { FindOptionsUtils } = getTypeORMFindOptionsUtils.sync()
  const defaultOptions = routeOptions.defaultOptions?.['findOneOrFail'] ?? {}
  const receiveOptions1 = parse( req.query.idOrOptionsOrConditions )
  const receiveOptions2 = parse( req.query.options )
  const options =
    FindOptionsUtils.isFindOneOptions( receiveOptions1 )
      ? union( defaultOptions, receiveOptions1 )
      : union( defaultOptions, receiveOptions2 )

  return schemas.findOneConditionsOrOptions( bridge )
    .then( schema => schema.validate( options ) )
    .then( options => {
      return !FindOptionsUtils.isFindOneOptions( receiveOptions1 )
        ? routeOptions.interceptors?.findOneOrFail
          ? routeOptions.interceptors.findOneOrFail( [ receiveOptions1 as any, options ], req, res, next )
          : bridge.findOneOrFail( receiveOptions1 as any, options )
        : routeOptions.interceptors?.findOneOrFail
          ? routeOptions.interceptors.findOneOrFail( [ options ], req, res, next )
          : bridge.findOneOrFail( options )
    } )
}

export { find, findOne, findOneOrFail, findByIds, findAndCount }
