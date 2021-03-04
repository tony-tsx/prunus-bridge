import { Connection, createConnection, getConnectionOptions } from 'typeorm'

let connection: Connection

beforeAll( async () => {
  const options = await getConnectionOptions()
  connection = await createConnection( options )
} )

afterAll( () => {
  connection.close()
} )
