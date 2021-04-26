import Bridge from '../../src'

const UserBrige = Bridge.create( {
  name: 'User',
  uri: 'users',
  getTypeORMEntity: () => import( '../entities/User.entity' ).then( module => module.User )
} )

// @ts-ignore
if ( typeof window !== 'undefined' ) window.UserBrige = UserBrige

export { UserBrige }
