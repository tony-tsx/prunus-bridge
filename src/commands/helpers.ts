import humps from 'humps'

import { Operators } from '../tools/operators'

const parseWhereOperator = ( op: string, value: string, args: string[] ) => {
  switch ( op.toLowerCase() ) {
    case '=': return Operators.Equal( value.replace( /^"(.*)"$/, '$1' ) )
    case '>': return Operators.MoreThan( value.replace( /^"(.*)"$/, '$1' ) )
    case '>=': return Operators.MoreThanOrEqual( value.replace( /^"(.*)"$/, '$1' ) )
    case '<': return Operators.LessThan( value.replace( /^"(.*)"$/, '$1' ) )
    case '<=': return Operators.LessThanOrEqual( value.replace( /^"(.*)"$/, '$1' ) )
    case 'like': return Operators.Like( value.replace( /^"(.*)"$/, '$1' ) )
    case 'is':
      if ( value.toLowerCase() === 'null' ) return Operators.IsNull()
      if ( value.toLowerCase() === 'not' )
        return Operators.Not(
          parseWhereOperator( ...args.splice( 0, 2 ) as [ string, string ], args )
        )
      return Operators.Equal( value.replace( /^"(.*)"$/, '$1' ) )
    case 'not':
      return Operators.Not(
        parseWhereOperator( value, ...args.splice( 0, 1 ) as [ string ], args )
      )
    case 'between':
      return Operators.Between( value, ...args.splice( 0, 1 ) as [ string ] )
    case 'in':
      return Operators.In( value.split( /,(?=(?:[^"]*"[^"]*")*[^"]*$)/g ) )
    case 'any':
      return Operators.Any( value.split( /,(?=(?:[^"]*"[^"]*")*[^"]*$)/g ) )
    case 'null':
      return Operators.IsNull()
    default: throw new Error( `unknown operator (${op})` )
  }
}

const parseWhere = ( predicate: string, previous: { [key: string]: any } | { [key: string]: any }[] = {} ) => {
  const args = predicate.split( / (?=(?:[^"]*"[^"]*")*[^"]*$)/g )
  while ( args.length ) {
    const [ field, op, value ] = args.splice( 0, 3 )
    if ( !op ) break
    const where = Array.isArray( previous ) ? previous[Math.max( 0, previous.length - 1 )] ??= {} : previous
    where[field] = parseWhereOperator( op, value, args )
    const next = args.shift()
    if ( next === 'or' )
      previous = Array.isArray( previous ) ? previous.concat( {} ) : [ previous, {} ]  
    if ( next !== 'or' && next !== 'and' ) args.unshift( next )
  }
  return previous
}

const clearObject = ( object: any, type: any = undefined ) =>
  Object.fromEntries(
    Object.entries( object )
      .filter( ( [ , value ] ) => value !== type )
  )

const question = async ( question: string ) => {
  const readline = require( 'readline' ) as typeof import( 'readline' )
  const readlineInterface = readline.createInterface( process.stdin, process.stdout )
  return new Promise<string>( ( resolve, reject ) => {
    try {
      readlineInterface.question( question, ( awswer: string ) => resolve( awswer ) )
    } catch ( e ) { reject( e ) }
  } )
}

const parseUnknowArgs = <T = any>( args: string[] ) => {
  const data = {}
  for( let i = 0; i < args.length; i++ )
    if ( args[i].startsWith( '--' ) )
      if ( args[i + 1].startsWith( '--' ) )
        data[humps.camelize( args[i].replace( '--', '' ) )] = true

      else if ( args[++i] === 'null' )
        data[humps.camelize( args[i].replace( '--', '' ) )] = null

      else data[humps.camelize( args[i].replace( '--', '' ) )] = args[i]
  return data as T
}

export { parseWhereOperator, parseWhere, clearObject, question, parseUnknowArgs }
