const parserArray = ( value: any, previous: any[] ) =>
  ( previous ??= [] ).concat( value.includes( ',' ) ? value.split( ',' ) : value )

export default parserArray
