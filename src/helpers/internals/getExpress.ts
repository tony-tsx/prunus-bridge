import { importer } from './prunus-bridge-importer'

// eslint-disable-next-line no-extra-parens
const getExpress = importer<typeof import( 'express' )>( 'express' )

export { getExpress }
