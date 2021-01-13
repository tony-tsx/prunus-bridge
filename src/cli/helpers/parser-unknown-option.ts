const parserUnknownOption = ( options: string[] ) => {
  return options.reduce( ( args, option, index, options ) => {
    if ( option.startsWith( '--' ) ) {
      let key = option.replace( '--', '' )
      let value: string | boolean = options[index + 1]

      if ( value.startsWith( '--' ) ) {
        if ( key.startsWith( 'no-' ) ) {
          key = key.replace( 'no-', '' )
          value = false
        }
        else value = true
      }

      const camel = key.split( '-' ).map( ( key, index ) => {
        if ( index === 0 ) return key
        return key.replace( /^[\w]/, ( m ) => m.toUpperCase() )
      } ).join( '' )

      return { ...args, [camel]: value }

    } else return args
  }, {} )
}

export default parserUnknownOption
