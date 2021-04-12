import { importer } from './prunus-bridge-importer'

// eslint-disable-next-line no-extra-parens
const getInquirer = importer<typeof import( 'inquirer' )>( 'inquirer' )

export { getInquirer }
