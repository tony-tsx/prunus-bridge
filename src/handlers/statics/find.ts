import { RequestHandler } from 'express'
import { NotFound } from 'http-errors'
import { FindConditions, FindManyOptions, FindOneOptions, ObjectID } from 'typeorm'
import { FindOptionsUtils } from 'typeorm/find-options/FindOptionsUtils'
import { getBridgeEntitySchemas as schemas } from '../../helpers/getBridgeEntitySchemas'

import { getDefaultRouteOptions as option } from '../../helpers/getDefaultRouteOptions'
import { parseQueryRecursive as parse } from '../../helpers/parseQueryRecursive'
import { processUnionOptions as union } from '../../helpers/processUnionOptions'

type Any = { [key: string]: any }
type FindQuery = FindManyOptions<Any> | FindConditions<Any>
type FindAndCountQuery = FindQuery
type FindByIdsQuery = {
  ids: any[]
  optionsOrConditions?: FindManyOptions<Any> | FindConditions<Any>
}
type FindOneQuery = {
  idOrOptionsOrConditions?: string | number | Date | ObjectID | FindOneOptions<Any> | FindConditions<Any>,
  options?: FindOneOptions<Any>
}
type FindOneOrFailQuery = FindOneQuery

const find: RequestHandler<unknown, unknown, unknown, FindQuery> = ( req, res, next ) => {
  const defaultOptions = option( req.bridge, 'find' )
  const receiveOptions = parse( req.query )
  const options = union( defaultOptions, receiveOptions ) as FindManyOptions
  schemas.findManyConditionsOrOptions( req.bridge )
    .then( schema => schema.validate( options ) )
    .then( options => req.bridge.find( options ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

const findAndCount: RequestHandler<unknown, unknown, unknown, FindAndCountQuery> = ( req, res, next ) => {
  const defaultOptions = option( req.bridge, 'findAndCount' )
  const receiveOptions = parse( req.query )
  const options = union( defaultOptions, receiveOptions ) as FindManyOptions
  schemas.findManyConditionsOrOptions( req.bridge )
    .then( schema => schema.validate( options ) )
    .then( options => req.bridge.findAndCount( options ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

const findByIds: RequestHandler<unknown, unknown, unknown, FindByIdsQuery> = ( req, res, next ) => {
  const defaultOptions = option( req.bridge, 'findByIds' )
  const ids = req.query?.ids ?? []
  const receiveOptions = parse( req.query.optionsOrConditions )
  const options = union( defaultOptions, receiveOptions ) as FindManyOptions
  schemas.findManyConditionsOrOptions( req.bridge )
    .then( schema => schema.validate( options ) )
    .then( options => req.bridge.findByIds( ids, options ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

const findOne: RequestHandler<unknown, unknown, unknown, FindOneQuery> = ( req, res, next ) => {
  const defaultOptions = option( req.bridge, 'findOne' )
  const receiveOptions1 = parse( req.query.idOrOptionsOrConditions )
  const receiveOptions2 = parse( req.query.options )
  const options =
    FindOptionsUtils.isFindOneOptions( receiveOptions1 )
      ? union( defaultOptions, receiveOptions1 )
      : union( defaultOptions, receiveOptions2 )

  schemas.findOneConditionsOrOptions( req.bridge )
    .then( schema => schema.validate( options ) )
    .then( options => !FindOptionsUtils.isFindOneOptions( receiveOptions1 )
      ? req.bridge.findOne( receiveOptions1 as any, options )
      : req.bridge.findOne( options )
    )
    .then( single => single ? single : Promise.reject( new NotFound( `${req.bridge.name} not found` ) ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

const findOneOrFail: RequestHandler<unknown, unknown, unknown, FindOneOrFailQuery> = ( req, res, next ) => {
  const defaultOptions = option( req.bridge, 'findOneOrFail' )
  const receiveOptions1 = parse( req.query.idOrOptionsOrConditions )
  const receiveOptions2 = parse( req.query.options )
  const options =
    FindOptionsUtils.isFindOneOptions( receiveOptions1 )
      ? union( defaultOptions, receiveOptions1 )
      : union( defaultOptions, receiveOptions2 )

  schemas.findOneConditionsOrOptions( req.bridge )
    .then( schema => schema.validate( options ) )
    .then( options => !FindOptionsUtils.isFindOneOptions( receiveOptions1 )
      ? req.bridge.findOne( receiveOptions1 as any, options )
      : req.bridge.findOne( options )
    )
    .then( single => single ? single : Promise.reject( new NotFound( `${req.bridge.name} not found` ) ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

/*
findRoute
  .get( paths( find.name, '/' ), handler( find ) )
  .get( paths( findOne.name, 'one', 'single' ), handler( findOne ) )
  .get( paths( findOneOrFail.name, 'oneFail', 'one/fail' ), handler( findOneOrFail ) )
  .get( paths( findByIds.name, 'ids' ), handler( findByIds ) )
  .get( paths( findAndCount.name, 'findCount', 'find/count' ), handler( findAndCount ) )
*/

export { find, findOne, findOneOrFail, findByIds, findAndCount }
