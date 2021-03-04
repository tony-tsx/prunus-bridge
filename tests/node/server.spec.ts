import Express from 'express'
import supertest from 'supertest'

import TypeORMBridge from '../../src'

import '../../running/common/bridges/User'

describe( 'Server TDD', () => {
  const server: Express.Application = Express()
  server.use( TypeORMBridge.handler() )
  server.all( '*', ( req, res ) => res.status( 404 ).json() )

  it( 'Get users without error', async () => {
    const response = await supertest( server ).get( '/users' )
    expect( response.headers['content-type'] ).toContain( 'application/json' )
    expect( [ 200, 304 ] ).toContain( response.status )
  } )

  it( 'Verify is user is create', async () => {
    supertest( server )
      .post( '/users' )
      .set( 'content-type', 'application/json' )
      .send( { firstName: 'Tony', lastName: 'Tea', email: 'tony.js@zoho.eu', dataBirth: new Date( 1800, 0, 11 ) } )
  } )
} )
