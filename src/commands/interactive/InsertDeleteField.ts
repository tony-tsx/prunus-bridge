import { Insert } from './Insert'
import { Interactive } from './Interactive'

class InsertDeleteField extends Interactive {
  constructor( private data: any ) {
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

    return new Insert( data )
  }
}

export { InsertDeleteField }
