import { RequestHandler } from 'express'
import { BadRequest } from 'http-errors'

import { parseQueryRecursive as parse } from '../helpers/parseQueryRecursive'

const find: RequestHandler = ( req, res ) => {
  res.json( req.entity )
}
const update: RequestHandler = ( req, res, next ) => {
  if ( !req.body || !Object.keys( req.body ).length )
    next( new BadRequest( 'empty body' ) )
  const query = parse( req.query )
  const defaultOption = {}
  const options = Object.assign( query, defaultOption )
  Object.assign( req.entity, req.body )
  req.entity.save( options )
    .then( res.json.bind( res ) )
    .catch( next )
}
const remove: RequestHandler = ( req, res, next ) => {
  const query = parse( req.query )
  const defaultOption = {}
  const options = Object.assign( query, defaultOption )
  req.entity.remove( options )
    .then( res.json.bind( res ) )
    .catch( next )
}

const softRemove: RequestHandler = ( req, res, next ) => {
  const query = parse( req.query )
  const defaultOption = {}
  const options = Object.assign( query, defaultOption )
  req.entity.softRemove( options )
    .then( res.json.bind( res ) )
    .catch( next )
}

export { find, update, remove, softRemove }
