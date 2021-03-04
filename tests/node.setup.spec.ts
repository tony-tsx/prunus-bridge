import { createConnection, getConnectionOptions, getConnectionManager } from 'typeorm'

beforeAll( async () => {
  await createConnection(
    await getConnectionOptions()
  )
} )

afterAll( () => {
  getConnectionManager().connections.forEach( connection => connection.close() )
} )
