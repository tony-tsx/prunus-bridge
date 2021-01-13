export const omit = <O, K extends string | number | symbol>( object: O, ...keys: K[] ): Omit<O, K> => {
  return Object.fromEntries(
    Object.entries( object )
      .filter( ( [ key ] ) => !keys.includes( key as K ) )
  ) as Omit<O, K>
}

export const pick = <O, K extends keyof O>( object: O, ...keys: K[] ): Pick<O, K> => {
  return Object.fromEntries(
    Object.entries( object )
      .filter( ( [ key ] ) => keys.includes( key as K ) )
  ) as Pick<O, K>
}

export const extract = <T = any>( key: string, data: any ): T => {
  return Object.keys( data )
    .filter( dataKey => dataKey.startsWith( key ) )
    .reduce( ( group, key ) => {
      const newKey = key.replace( /^option([A-Z])/, ( match, key ) => key.toLowerCase() )
      let value = data[key]
      if ( typeof value === 'string' && !isNaN( Number( value ) ) ) value = Number( value )
      return { ...group, [newKey]: value }
    }, {} as T )
}

