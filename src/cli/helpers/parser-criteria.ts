import operations, { keys } from '../../op'
import { Operator } from '../../op/client'

const whereRegExp = /^(?<field>\w+) (?<op>=|!=|<|<=|>|>=|(((not|!) ?)?like|in|between|any|null)) (?<value>.*)/i

const whereNot = /^(not|!) ?/i

const isNot = ( op: string ) => whereNot.test( op )

const ArrayKeys = [ 'Any', 'In' ] as ( keys )[]

const isBetweenOp = ( key: keys ): key is 'between' | 'Between' => operations._.labels[key] === 'Between'

const get = ( key: keys ) => operations._.client[key] as ( ...args: any[] ) => any

const call = ( key: keys, ...args: any[] ): Operator =>
  get( key )( ...args )

const parserCriteria = ( predicate: string, previous: any = {} ) => {
  const result = whereRegExp.exec( predicate )
  if ( !result ) return previous
  const { field, op, value } = result.groups as { field: string, op: keys, value: string }
  const realValue = ArrayKeys.includes( operations._.labels[op] )
    ? value.replace( /^[(|[|{]?(.*)[)|\]|}]?$/, '$1' ).split( ',' )
    : isBetweenOp( op )
      ? value.replace( /^(.*) (and|~) ?(.*)$/, '$1,$2' ).split( ',' )
      : value
  if ( isNot( op ) ) {
    const op2 = op.replace( whereNot, '' ) as keys
    previous[field] = operations._.parser(
      call( 'not', ...isBetweenOp( op2 ) ? [ realValue[0], realValue[1] ] : [ realValue ] )
    )
  }
  else previous[field] = operations._.parser(
    call( op, ...isBetweenOp( op ) ? [ realValue[0], realValue[1] ] : [ realValue ] )
  )
  return previous
}

parserCriteria.default = {}

export default parserCriteria
