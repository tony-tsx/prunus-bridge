const key = 'typeorm' as const
type module = typeof import( 'typeorm' )

const getTypeORM = () => import( key ) as Promise<module>

getTypeORM.sync = () => require( key ) as module

export { getTypeORM }
