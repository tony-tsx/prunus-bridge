import { importer } from "./prunus-bridge-importer";

type FindOptionsUtils = typeof import( 'typeorm/find-options/FindOptionsUtils' )

const getTypeORMFindOptionsUtils = importer<FindOptionsUtils>( 'typeorm/find-options/FindOptionsUtils' )

export { getTypeORMFindOptionsUtils }
