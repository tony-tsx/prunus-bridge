import { AnyBridgeInstance } from '../../typings/bridge'
import { Interactive } from './Interactive'
import { Update } from './Update'

class UpdateEdit extends Interactive {
  constructor( private entities: AnyBridgeInstance[], private data: any ) {
    super()
  }
  public question = async () => {
    const { name } = await this.inquirer.prompt( {
      type: 'input',
      message: 'what is field name? ( void to end )',
      name: 'name'
    } )

    if ( !name ) return new Update( this.entities, this.data )

    const { value } = await this.inquirer.prompt( {
      type: 'input',
      message: 'what is field value?',
      name: 'value'
    } )

    try {
      return new UpdateEdit( this.entities, { ...this.data, [name]: JSON.parse( value ) } )
    } catch ( e ) {
      return new UpdateEdit( this.entities, { ...this.data, [name]: value } )
    }
  }
}

export { UpdateEdit }
