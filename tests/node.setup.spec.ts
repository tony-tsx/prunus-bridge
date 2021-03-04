import { Connection, createConnection, getConnectionOptions } from 'typeorm'

let connection: Connection

beforeAll( async () => {
  console.log( 'open connection' )
  const options = await getConnectionOptions()
  connection = await createConnection( options )
} )

afterAll( () => {
  console.log( 'close connection' )
  connection.close()
} )
