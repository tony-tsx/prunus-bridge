import { RequestHandler } from 'express'
import { FindManyOptions, FindOneOptions } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { getBridgeEntitySchema } from '../../helpers/getBridgeEntitySchema'
import { getBridgeEntitySchemas as schemas } from '../../helpers/getBridgeEntitySchemas'

type Any = { [key: string]: any }
type InsertBody = QueryDeepPartialEntity<Any> | QueryDeepPartialEntity<Any>[]
type InsertOneBody = QueryDeepPartialEntity<Any>
type InsertAndFindBody = InsertBody
type InsertOneAndFindBody = InsertOneBody
type InsertAndFindQuery = FindManyOptions<Any>
type InsertOneAndFindQuery = FindOneOptions<Any>

const insert: RequestHandler<unknown, unknown, InsertBody, null> = async ( req, res, next ) => {
  schemas.insert( req.bridge )
    .then( schema => schema.validate( req.body ) )
    .then( () => req.bridge.insert( req.body ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

const insertOne: RequestHandler<unknown, unknown, InsertOneBody, null> = ( req, res, next ) => {
  schemas.insertOne( req.bridge )
    .then( schema => schema.validate( req.body ) )
    .then( () => req.bridge.insertOne( req.body ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

const insertAndFind: RequestHandler<unknown, unknown, InsertAndFindBody, InsertAndFindQuery> = ( req, res, next ) => {
  schemas.insert( req.bridge )
    .then( schema => schema.validate( req.body ) )
    .then( () => req.bridge.insertAndFind( req.body ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

const insertOneAndFind: RequestHandler<
  unknown, unknown, InsertOneAndFindBody, InsertOneAndFindQuery
> = ( req, res, next ) => {
  schemas.insertOne( req.bridge )
    .then( schema => schema.validate( req.body ) )
    .then( () => req.bridge.insertOneAndFind( req.body ) )
    .then( res.json.bind( res ) )
    .catch( next )
}

/*
insertRoute
  .post( paths( insert.name, '/' ), handler( insert ) )
  .post( paths( insertOne.name, 'one', 'single' ), handler( insertOne ) )
  .post( paths( insertAndFind.name, 'find' ), handler( insertAndFind ) )
  .post( paths( insertOneAndFind.name, 'oneFind', 'singleFind' ), handler( insertOneAndFind ) )
*/

export { insert, insertOne, insertAndFind, insertOneAndFind }
