import operations, { keys, Operator } from '../../op'

const whereRegExp = /^(?<field>\w+) (?<op>=|!=|<|<=|>|>=|(((not|!) ?)?like|in|between|any|null)) (?<value>.*)/i

const whereNot = /^(not|!) ?/i

const isNot = ( op: string ) => whereNot.test( op )

let index = 0

const ArrayKeys = [ 'Any', 'In' ] as ( keys )[]

const isBetweenOp = ( key: keys ): key is 'between' | 'Between' => operations._.labels[key] === 'Between'

const get = ( key: keys ) => operations._.client[key] as ( ...args: any[] ) => any

const call = ( key: keys, ...args: any[] ): Operator =>
  get( key )( ...args )

const parserWhere = ( predicate: string, previous: any[] = [ {} ] ): any => {
  if ( predicate.toLowerCase() === 'or' ) previous[++index] = {}
  else {
    const result = whereRegExp.exec( predicate )
    if ( !result ) return previous
    const { field, op, value } = result.groups as { field: string, op: keys, value: string }

    const realValue = ArrayKeys.includes( operations._.labels[op] )
      ? value.replace( /^[(|[|{]?(.*)[)|\]|}]?$/, '$1' ).split( ',' )
      : operations._.labels[op] === 'Between'
        ? value.replace( /^(.*) (and|~) ?(.*)$/, '$1,$2' ).split( ',' )
        : value

    if ( isNot( op ) ) {
      const op2 = op.replace( whereNot, '' ) as keys
      previous[index][field] = operations._.parser(
        operations._.client.not(
          isBetweenOp( op2 )
            ? call( op2, realValue[0], realValue[1] )
            : call( op2, realValue )
        )
      )
    }

    else previous[index][field] = operations._.parser(
      isBetweenOp( op )
        ? call( op, realValue[0], realValue[1] )
        : call( op, realValue )
    )
  }
  return previous
}

export default parserWhere
