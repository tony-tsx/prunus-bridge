import { Operators } from '../tools/operators'

const numberRegExp = /^[0-9]+(\.[0-9]+)?$/

const parseQueryRecursive = <T>( object: T ): T => {
  console.log( object )
  if ( typeof object !== 'object' || object === null ) return object
  if ( Array.isArray( object ) ) {
    return object.map( value => {
      console.log( { value } )
      if ( typeof value === 'string' )
        if ( Operators.tools.isClientOperator( value ) )
          return Operators.tools.parseClientOperator( value )
  
        else if ( numberRegExp.test( value ) )
          return Number( value )
  
        else if ( value === 'true' )
          return true
  
        else if ( value === 'false' )
          return false
  
        else return value
  
      else if ( typeof value === 'object' )
        return parseQueryRecursive( value )
  
      return value
    } ) as any as T
  }
  return Object.entries( object ).reduce( ( object, [ key, value ] ) => {
    if ( typeof value === 'string' )
      if ( Operators.tools.isClientOperator( value ) )
        return { ...object, [key]: Operators.tools.parseClientOperator( value ) }

      else if ( numberRegExp.test( value ) )
        return { ...object, [key]: Number( value ) }

      else if ( value === 'true' )
        return { ...object, [key]: true }

      else if ( value === 'false' )
        return { ...object, [key]: false }

      else return { ...object, [key]: value }

    if ( typeof value === 'object' )
      return { ...object, [key]: parseQueryRecursive( value ) }

    return { ...object, [key]: value }
  }, {} ) as T
}

export { parseQueryRecursive }
