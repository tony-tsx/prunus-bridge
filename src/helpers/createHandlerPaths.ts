import humps from 'humps'

const createHandlerPaths = ( ...paths: ( string | null | undefined | RegExp | ( string | RegExp )[] )[] ) => {
  return [
    ...new Set(
      paths
        .filter( Boolean )
        .map( path => {
          if ( typeof path !== 'string' ) {
            if ( Array.isArray( path ) )
              return createHandlerPaths( ...path )

            return [ path ]
          }
          const normalized = path.startsWith( '/' )
            ? path
            : path.startsWith( '_' )
              ? `/${path.replace( '_', '' )}`
              : `/${path}`
          return [ normalized, humps.pascalize( normalized ), humps.decamelize( normalized, { separator: '-' } ) ]
        } )
        .flat( 1 )
    )
  ]
}

export { createHandlerPaths }
