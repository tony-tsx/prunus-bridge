import { importer } from './prunus-bridge-importer'

// eslint-disable-next-line no-extra-parens
const getCommander = importer<typeof import( 'commander' )>( 'commander' )

export { getCommander }
