const extractKeys = <T>( data: T ) => Object.keys( data ) as ( keyof T )[]

export { extractKeys }
