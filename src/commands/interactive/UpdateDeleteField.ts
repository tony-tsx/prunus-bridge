import { AnyBridgeInstance } from '../../typings/bridge'
import { Interactive } from './Interactive'
import { Update } from './Update'

class UpdateDeleteField extends Interactive {
  constructor( private entities: AnyBridgeInstance[], private data: any ) {
    super()
  }
  public question = async () => {
    const { names } = await this.inquirer.prompt( {
      type: 'checkbox',
      name: 'names',
      choices: Object.keys( this.data )
    } )

    const data = Object.fromEntries(
      Object.entries( this.data )
        .filter( ( [ name ] ) => names.includes( name ) )
    )

    return new Update( this.entities, data )
  }
}

export { UpdateDeleteField }
