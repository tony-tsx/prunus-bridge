import { FindOperator } from 'typeorm'

import getTypeORM from '../helpers/get-typeorm'
import { regexp, glue, Operator, Operators } from './client'
import labels from './labels'

export const isOperator = ( data: any ): data is Operator =>
  typeof data === 'string' && regexp.test( data )

const parser = ( op: Operator ): FindOperator<any> => {
  const result = regexp.exec( op )
  if ( !result ) throw new Error( '' )
  const { op: _operator, value } = result.groups as { op: Operators, value: string }

  const operator = labels[_operator]

  if ( operator === 'IsNull' ) return getTypeORM.sync()[operator]()

  if ( operator === 'Any' || operator === 'In' )
    if ( isOperator( value ) )
      return getTypeORM.sync()[operator]( parser( value ) )

    else return getTypeORM.sync()[operator]( value.split( glue ) )

  if ( operator === 'Between' ) {
    const [ from, to ] = value.split( glue )
    if ( isOperator( from ) )
      if ( isOperator( to ) )
        return getTypeORM.sync()[operator]( parser( from ), parser( to ) )

      else return getTypeORM.sync()[operator]( parser( from ), to )

    else return getTypeORM.sync()[operator]( from, to )
  }

  if ( operator === 'Raw' ) return getTypeORM.sync()[operator]( value )

  if ( isOperator( value ) )
    return getTypeORM.sync()[operator]( parser( value ) )

  return getTypeORM.sync()[operator]( value )
}

export default parser
