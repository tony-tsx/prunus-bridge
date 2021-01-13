import { RequestHandler } from 'express'

import parser, { isOperator } from '../op/parser'

const parserRecursive = ( object: any ): any => {
  if ( !object ) return object
  return Object.entries( object ).reduce( ( object, [ key, value ] ) => {
    if ( typeof value === 'string' && isOperator( value ) )
      return { ...object, [key]: parser( value ) }
    if ( typeof value === 'object' )
      return { ...object, [key]: parserRecursive( value ) }
    return { ...object, [key]: value }
  }, {} )
}

const parserOperations = ( ...search: string[] ): RequestHandler<any, any, any, any> => {
  return ( req, res, next ) => {
    search.forEach( key => {
      req.query[key] = parserRecursive( req.query[key] )
    } )
    next()
  }
}

export default parserOperations
