export const assertIsBackEnd = <T = void>( call: () => T ): T => {
  if ( typeof window !== 'undefined' ) throw new Error( '' )
  return call()
}

export const assertIsFrontEnd = () => {
  if ( typeof window === 'undefined' ) throw new Error( '' )
}
