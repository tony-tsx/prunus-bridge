import { Insert } from './Insert'
import { Interactive } from './Interactive'

class InsertEdit extends Interactive {
  constructor( private data: any ) {
    super()
  }
  public question = async () => {
    const { name } = await this.inquirer.prompt( {
      type: 'input',
      message: 'what is field name? ( void to end )',
      name: 'name'
    } )

    if ( !name ) return new Insert( this.data )

    const { value } = await this.inquirer.prompt( {
      type: 'input',
      message: 'what is field value?',
      name: 'value'
    } )

    try {
      return new InsertEdit( { ...this.data, [name]: JSON.parse( value ) } )
    } catch ( e ) {
      return new InsertEdit( { ...this.data, [name]: value } )
    }
  }
}

export { InsertEdit }
