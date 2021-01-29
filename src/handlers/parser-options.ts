import { RequestHandler } from 'express'

import parser, { isOperator } from '../op/parser'

const testNumber = /\d+/

const parserRecursive = ( object: any ): any => {
  if ( !object ) return object
  if ( Array.isArray( object ) ) return object.map( value => {
    if ( typeof value === 'string' && isOperator( value ) )
      return parser( value )
    if ( typeof value === 'string' && testNumber.test( value ) )
      return Number( value )
    else if ( value === 'object' )
      return parserRecursive( value )
    return value
  } )
  return Object.entries( object ).reduce( ( object, [ key, value ] ) => {
    if ( typeof value === 'string' && isOperator( value ) )
      return { ...object, [key]: parser( value ) }
    if ( typeof value === 'string' && testNumber.test( value ) )
      return { ...object, [key]: Number( value ) }
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
