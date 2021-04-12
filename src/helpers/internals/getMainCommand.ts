import { importer } from './prunus-bridge-importer'

// eslint-disable-next-line no-extra-parens
const getMainCommand = importer<typeof import( '../../commands/main' )>( '../../commands/main', () => __dirname )

export { getMainCommand }

