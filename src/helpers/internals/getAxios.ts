import { importer } from "./prunus-bridge-importer";

type axios = typeof import( 'axios' )

const getAxios = importer<axios>( 'axios' )

export { getAxios }