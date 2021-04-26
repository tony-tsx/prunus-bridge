import { Operators } from '../tools/operators'

const numberRegExp = /^[0-9]+(\.[0-9]+)?$/

const parseQueryRecursive = <T>( object: T, fromJSON = false ): T => {
  if ( typeof object !== 'object' || object === null ) return object
  if ( Array.isArray( object ) ) {
    return object.map( value => {
      if ( typeof value === 'string' )
        if ( Operators.tools.isClientOperator( value ) )
          return Operators.tools.parseClientOperator( value )

        else if ( fromJSON )
          return value
  
        else if ( numberRegExp.test( value ) )
          return Number( value )
  
        else if ( value === 'true' )
          return true
  
        else if ( value === 'false' )
          return false

        else try {
          return parseQueryRecursive( JSON.parse( value ), true )
        } catch {
          return value
        }
  
      else if ( typeof value === 'object' )
        return parseQueryRecursive( value, fromJSON )
  
      return value
    } ) as any as T
  }
  return Object.entries( object ).reduce( ( object, [ key, value ] ) => {
    if ( typeof value === 'string' )
      if ( Operators.tools.isClientOperator( value ) )
        return { ...object, [key]: Operators.tools.parseClientOperator( value ) }

      else if ( fromJSON )
        return { ...object, [key]: value }

      else if ( numberRegExp.test( value ) )
        return { ...object, [key]: Number( value ) }

      else if ( value === 'true' )
        return { ...object, [key]: true }

      else if ( value === 'false' )
        return { ...object, [key]: false }

      else try {
        return { ...object, [key]: parseQueryRecursive( JSON.parse( value ), true ) }
      } catch {
        return { ...object, [key]: value }
      }

    if ( typeof value === 'object' )
      return { ...object, [key]: parseQueryRecursive( value, fromJSON ) }

    return { ...object, [key]: value }
  }, {} ) as T
}

export { parseQueryRecursive }
