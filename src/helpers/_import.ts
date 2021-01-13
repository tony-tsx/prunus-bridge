export const _import = <T = any>( module: string ): Promise<T> => import( module )
export const _require = <T = any>( module: string, dirname?: string ): T =>
  dirname
    ? require.call( null, _require( 'path' ).join( dirname, module ) )
    : require.call( null, module )
