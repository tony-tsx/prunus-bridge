import { FindOperator } from 'typeorm'

import { record } from './helpers'

export const prefix = '#[bridge-operator]' as const
export const glue = '+^|^+' as const
export type glue = typeof glue
export type prefix = typeof prefix

export const isOperator = ( data: any ): data is Operator =>
  typeof data === 'string' && regexp.test( data )

export type Operators =
  | 'Not' | 'LessThan' | 'LessThanOrEqual' | 'MoreThan' | 'MoreThanOrEqual' | 'Equal'
  | 'Like' | 'Between' | 'In' | 'Any' | 'IsNull' | 'Raw'

export type str = string

export type Operator = `${prefix}[${Operators}](${str})`

const arr = ( value: any | any[] ) => Array.isArray( value ) ? value.join( glue ) : value

const clientNot = <V>( value: V | FindOperator<V> ) =>
  mark( 'Not', value )

const clientLessThan = <V>( value: V | FindOperator<V> ) =>
  mark( 'LessThan', value )

const clientLessThanOrEqual = <V>( value: V | FindOperator<V> ) =>
  mark( 'LessThanOrEqual', value )

const clientMoreThan = <V>( value: V | FindOperator<V> ) =>
  mark( 'MoreThan', value )

const clientMoreThanOrEqual = <V>( value: V | FindOperator<V> ) =>
  mark( 'MoreThanOrEqual', value )

const clientEqual = <V>( value: V | FindOperator<V> ) =>
  mark( 'Equal', value )

const clientLike = <V>( value: V | FindOperator<V> ) =>
  mark( 'Like', value )

const clientBetween = <V>( from: V | FindOperator<V>, to: V | FindOperator<V> ) =>
  mark( 'Between', `${from}${glue}${to}` )

const clientIn = <V>( values: V[] | FindOperator<V> ) =>
  mark( 'In', arr( values ) )

const clientAny = <V>( values: V[] | FindOperator<V> ) =>
  mark( 'Any', arr( values ) )

const clientIsNull = () => mark( 'IsNull' )

const clientRaw = ( raw: string ) => mark( 'Raw', raw )

const mark = ( method: string, value?: any ) => {
  if ( value ) return `${prefix}[${method}](${value})` as Operator
  return `${prefix}[${method}]` as Operator
}

const client = {
  ...record( [ 'Not', 'not' ], clientNot ),
  ...record( [ 'LessThan', 'lessThan', '<' ], clientLessThan ),
  ...record( [ 'LessThanOrEqual', 'lessThanOrEqual', '<=' ], clientLessThanOrEqual ),
  ...record( [ 'MoreThan', 'moreThan', '>' ], clientMoreThan ),
  ...record( [ 'MoreThanOrEqual', 'moreThanOrEqual', '>=' ], clientMoreThanOrEqual ),
  ...record( [ 'Equal', 'equal', '=' ], clientEqual ),
  ...record( [ 'Like', 'like' ], clientLike ),
  ...record( [ 'Between', 'between' ], clientBetween ),
  ...record( [ 'In', 'in' ], clientIn ),
  ...record( [ 'Any', 'any' ], clientAny ),
  ...record( [ 'IsNull', 'isNull', 'null' ], clientIsNull ),
  ...record( [ 'Raw', 'raw' ], clientRaw ),
}

export const regexp = RegExp( `^#\\[bridge-operator\\]\\[(?<op>(${Object.keys( client ).join( '|' )}))\\](\\((?<value>.*)\\))?$` )

export default client
