const importer = <T>( name: string, basepath?: string | ( () => string ) ): importer.Importer<T> => {
  const importer = () => {
    return import( importer.resolve() ) as Promise<T>
  }
  importer.resolve = () => {
    if ( basepath && name.startsWith( '.' ) ) {
      const base = typeof basepath === 'string' ? basepath : basepath()
      return getPath.sync().join( base, name )
    }
    return name
  }
  importer.sync = () => require( importer.resolve() ) as T
  return importer
}

// eslint-disable-next-line no-extra-parens
const getPath = importer<typeof import( 'path' )>( 'path' )

declare namespace importer {
  export interface Importer<T> {
    (): Promise<T>
    sync(): T
  }
}

export { importer }
