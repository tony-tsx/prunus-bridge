import TypeORM, { FindOperator } from 'typeorm'

import { getTypeORM } from '../helpers/internals/getTypeORM'
import { useTypeormSystem } from '../helpers/useTypeormSystem'

const NATIVE_OPERATORS = [
  'Not',
  'LessThan',
  'LessThanOrEqual',
  'MoreThan',
  'MoreThanOrEqual',
  'Equal',
  'Like',
  'Between',
  'In',
  'Any',
  'IsNull',
  'Raw' 
] as const

type NATIVE_OPERATORS = typeof NATIVE_OPERATORS extends readonly ( infer O )[] ? O : never

type ClientOperatorString = `${Operators.CLIENT_OPERATOR_PREFIX}${Operators.CLIENT_OPERATOR_GLUE_LEFT}${NATIVE_OPERATORS}${Operators.CLIENT_OPERATOR_GLUE_RIGHT}(${string})`

type PolymorphFindOperator<T> = ClientOperatorString | FindOperator<T>

const Operators = {
  constants: {
    CLIENT_OPERATOR_PREFIX: '#',
    CLIENT_OPERATOR_GLUE_LEFT: '',
    CLIENT_OPERATOR_GLUE_RIGHT: '',
  },
  tools: {
    isClientOperator: ( value: any ): value is ClientOperatorString =>
      Operators.tools.clientOperatorRegExp.test( value ),
    parseClientOperator: ( str: ClientOperatorString ): FindOperator<any> => {
      const regExp = Operators.tools.clientOperatorRegExp
      const result = regExp.exec( str )
      if ( result?.groups && result.groups.operator && result.groups.args ) {
        const { operator, args: stringArgs } = result.groups
        const unparsedArgs: any[] = JSON.parse( stringArgs )
        const args = unparsedArgs.map( arg => Operators.tools.isClientOperator( arg )
          ? Operators.tools.parseClientOperator( arg )
          : arg )
        return Operators[operator]( ...args )
      }
      else throw new Error( `invalid client string expression please match ${regExp}` )
    },
    get clientOperatorRegExp() {
      return RegExp(
        `^${
          Operators.tools.escapeStringRegExp( Operators.constants.CLIENT_OPERATOR_PREFIX )
        }${
          Operators.tools.escapeStringRegExp( Operators.constants.CLIENT_OPERATOR_GLUE_LEFT )
        }(?<operator>${
          NATIVE_OPERATORS.join( '|' )
        })${
          Operators.tools.escapeStringRegExp( Operators.constants.CLIENT_OPERATOR_GLUE_RIGHT )
        }\\((?<args>.*)\\)$`
      )
    },
    mark: ( ( method: NATIVE_OPERATORS, ...args: any[] ): ClientOperatorString | FindOperator<any> => {
      if ( useTypeormSystem() ) {
        const TypeORM = getTypeORM.sync()
        TypeORM.LessThan
        return TypeORM[method].call( TypeORM, ...args )
      }
      return `${Operators.constants.CLIENT_OPERATOR_PREFIX}${Operators.constants.CLIENT_OPERATOR_GLUE_LEFT}${method}${Operators.constants.CLIENT_OPERATOR_GLUE_RIGHT}(${JSON.stringify( args )})` as const
    } ) as {
      <T extends Exclude<NATIVE_OPERATORS, 'Raw'>, D = any>( method: T, ...args: Parameters<( typeof TypeORM )[T]> ):
        PolymorphFindOperator<D>
      ( method: 'Raw', value: string ): PolymorphFindOperator<any>
    },
    escapeStringRegExp: ( str: string ) => str
      .replace( /[|\\{}()[\]^$+*?.]/g, '\\$&' )
      .replace( /-/g, '\\x2d' )
  },
  Not: <T>( value: T | PolymorphFindOperator<T> ) => Operators.tools.mark<'Not', T>( 'Not', value ),
  LessThan: <T>( value: T | PolymorphFindOperator<T> ) => Operators.tools.mark<'LessThan', T>( 'LessThan', value ),
  LessThanOrEqual: <T>( value: T | PolymorphFindOperator<T> ) => Operators.tools.mark<'LessThanOrEqual', T>( 'LessThanOrEqual', value ),
  MoreThan: <T>( value: T | PolymorphFindOperator<T> ) => Operators.tools.mark<'MoreThan', T>( 'MoreThan', value ),
  MoreThanOrEqual: <T>( value: T | PolymorphFindOperator<T> ) => Operators.tools.mark<'MoreThanOrEqual', T>( 'MoreThanOrEqual', value ),
  Equal: <T>( value: T | PolymorphFindOperator<T> ) => Operators.tools.mark<'Equal', T>( 'Equal', value ),
  Like: <T>( value: T | PolymorphFindOperator<T> ) => Operators.tools.mark<'Like', T>( 'Like', value ),
  Between: <T>( from: T | PolymorphFindOperator<T>, to: T | PolymorphFindOperator<T> ) => Operators.tools.mark<'Between', T>( 'Between', from, to ),
  In: <T>( value: T[] | PolymorphFindOperator<T>[] ) => Operators.tools.mark<'In', T>( 'In', value ),
  Any: <T>( value: T[] | PolymorphFindOperator<T>[] ) => Operators.tools.mark<'Any', T>( 'Any', value ),
  IsNull: () => Operators.tools.mark( 'IsNull' ),
  Raw: ( value: string ) => Operators.tools.mark( 'Raw', value ),
}

declare namespace Operators {
  export type CLIENT_OPERATOR_PREFIX = string
  export type CLIENT_OPERATOR_GLUE_LEFT = string
  export type CLIENT_OPERATOR_GLUE_RIGHT = string
}

export { Operators }
