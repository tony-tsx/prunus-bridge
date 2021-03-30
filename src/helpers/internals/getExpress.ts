const key = 'express' as const
type module = typeof import( 'express' )

const getExpress = () => import( key ) as Promise<module>

getExpress.sync = () => require( key ) as module

export { getExpress }
