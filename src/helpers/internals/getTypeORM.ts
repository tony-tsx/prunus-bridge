import { importer } from './prunus-bridge-importer'

// eslint-disable-next-line no-extra-parens
const getTypeORM = importer<typeof import( 'typeorm' )>( 'typeorm' )

export { getTypeORM }
