import { FindOperator } from 'typeorm'

import client from './op/client'
export { Operator } from './op/client'
import { record } from './op/helpers'
import labels from './op/labels'
import parser from './op/parser'
import server from './op/server'

const IS_CLIENT = typeof window !== 'undefined'

const get = ( method: keyof typeof client ): ( ...args: any[] ) => any =>
  IS_CLIENT ? client[method] : server[method]

const delegate = <T>( method: keyof typeof client, ...args: any[] ): string | FindOperator<T> =>
  get( method )( ...args )

const not = <V>( value: V | FindOperator<V> ) =>
  delegate<V>( 'Not', value )

const lessThan = <V>( value: V | FindOperator<V> ) =>
  delegate<V>( 'LessThan', value )

const lessThanOrEqual = <V>( value: V | FindOperator<V> ) =>
  delegate<V>( 'LessThanOrEqual', value )

const moreThan = <V>( value: V | FindOperator<V> ) =>
  delegate<V>( 'MoreThan', value )

const moreThanOrEqual = <V>( value: V | FindOperator<V> ) =>
  delegate<V>( 'MoreThanOrEqual', value )

const equal = <V>( value: V | FindOperator<V> ) =>
  delegate<V>( 'Equal', value )

const like = <V>( value: V | FindOperator<V> ) =>
  delegate<V>( 'Like', value )

const between = <V>( from: V | FindOperator<V>, to: V | FindOperator<V> ) =>
  delegate<V>( 'Between', from, to )

const _in = <V>( value: V[] | FindOperator<V> ) =>
  delegate<V>( 'In', value )

const any = <V>( value: V[] | FindOperator<V> ) =>
  delegate<V>( 'Any', value )

const isNull = () => delegate( 'IsNull' )

const raw = <V>( raw: string ) => delegate<V>( 'Raw', raw )

const op = {
  ...record( [ 'Not', 'not' ], not ),
  ...record( [ 'LessThan', 'lessThan', '<' ], lessThan ),
  ...record( [ 'LessThanOrEqual', 'lessThanOrEqual', '<=' ], lessThanOrEqual ),
  ...record( [ 'MoreThan', 'moreThan', '>' ], moreThan ),
  ...record( [ 'MoreThanOrEqual', 'moreThanOrEqual', '>=' ], moreThanOrEqual ),
  ...record( [ 'Equal', 'equal', '=' ], equal ),
  ...record( [ 'Like', 'like' ], like ),
  ...record( [ 'Between', 'between' ], between ),
  ...record( [ 'In', 'in' ], _in ),
  ...record( [ 'Any', 'any' ], any ),
  ...record( [ 'IsNull', 'isNull', 'null' ], isNull ),
  ...record( [ 'Raw', 'raw' ], raw ),
  _: { client, server, labels, parser }
}

export type keys = Extract<
  Extract<keyof typeof client, keyof typeof server>,
  keyof typeof labels
>

export default op
