import humps from 'humps'

const createHandlerPaths = ( ...paths: string[] ) => {
  return [
    ...new Set(
      paths
        .map( path => {
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
