import TypeORMBridge from '../../dist'

const calcAge = ( from: Date ) => {
  if ( !from ) return NaN
  const today = new Date()
  const age = today.getFullYear() - from.getFullYear()
  const methods = [ 'getMonth', 'getDate', 'getMonth', 'getHours', 'getMinutes', 'getSeconds', 'getMilliseconds' ] as const
  return methods.some(
    ( method, index, methods ) => {
      const check = methods.slice( 0, index ).every( method => today[method]() === from[method]() )
      return check && today[method]() < from[method]()
    }
  ) ? age - 1 : age
}

type User = typeof import( '../entities/User' )['User']

const User = TypeORMBridge.create<User, {}, { age: number }> ( {
  target: () => import( '../entities/User' ).then( module => module.User ),
  axios: async () => ( {} ) as any,
  uri: '/users',
  name: 'User',
  prototype: Object.defineProperties( {}, {
    age: {
      get( this: InstanceType<( typeof import( '../entities/User' ) )['User']> ) {
        return calcAge( this.birthDate )
      },
      set: () => {},
      configurable: true,
      enumerable: true
    }
  } )
} )

export default User
