import { FindOperator } from 'typeorm'

import getTypeORM from '../helpers/get-typeorm'
import { record } from './helpers'

export type Operators =
  | 'Not' | 'LessThan' | 'LessThanOrEqual' | 'MoreThan' | 'MoreThanOrEqual' | 'Equal'
  | 'Like' | 'Between' | 'In' | 'Any' | 'IsNull' | 'Raw'

const serverNot = <V>( value: V | FindOperator<V> ) =>
  mark<V>( 'Not', value )

const serverLessThan = <V>( value: V | FindOperator<V> ) =>
  mark<V>( 'LessThan', value )

const serverLessThanOrEqual = <V>( value: V | FindOperator<V> ) =>
  mark<V>( 'LessThanOrEqual', value )

const serverMoreThan = <V>( value: V | FindOperator<V> ) =>
  mark<V>( 'MoreThan', value )

const serverMoreThanOrEqual = <V>( value: V | FindOperator<V> ) =>
  mark<V>( 'MoreThanOrEqual', value )

const serverEqual = <V>( value: V | FindOperator<V> ) =>
  mark<V>( 'Equal', value )

const serverLike = <V>( value: V | FindOperator<V> ) =>
  mark<V>( 'Like', value )

const serverBetween = <V>( from: V | FindOperator<V>, to: V | FindOperator<V> ) =>
  mark<V>( 'Between', from, to )

const serverIn = <V>( values: V[] | FindOperator<V> ) =>
  mark<V>( 'In', values )

const serverAny = <V>( values: V[] | FindOperator<V> ) =>
  mark<V>( 'Any', values )

const serverIsNull = () => mark( 'IsNull' )

const serverRaw = ( raw: string ) => mark( 'Raw', raw )

const mark = <T>( method: Operators, ...args: any[] ): FindOperator<T> => {
  // eslint-disable-next-line no-extra-parens
  return ( getTypeORM.sync()[method] as any )( ...args )
}

const server = {
  ...record( [ 'Not', 'not' ], serverNot ),
  ...record( [ 'LessThan', 'lessThan', '<' ], serverLessThan ),
  ...record( [ 'LessThanOrEqual', 'lessThanOrEqual', '<=' ], serverLessThanOrEqual ),
  ...record( [ 'MoreThan', 'moreThan', '>' ], serverMoreThan ),
  ...record( [ 'MoreThanOrEqual', 'moreThanOrEqual', '>=' ], serverMoreThanOrEqual ),
  ...record( [ 'Equal', 'equal', '=' ], serverEqual ),
  ...record( [ 'Like', 'like' ], serverLike ),
  ...record( [ 'Between', 'between' ], serverBetween ),
  ...record( [ 'In', 'in' ], serverIn ),
  ...record( [ 'Any', 'any' ], serverAny ),
  ...record( [ 'IsNull', 'isNull', 'null' ], serverIsNull ),
  ...record( [ 'Raw', 'raw' ], serverRaw ),
}

export default server
