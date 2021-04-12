import { AnyBridgeInstance } from '../../typings/bridge'
import { Interactive } from './Interactive'
import { Update } from './Update'

class UpdateSelection extends Interactive {
  constructor( private entities: AnyBridgeInstance[], private data: any ) {
    super()
  }
  public question = async () => {
    const { records } = await this.inquirer.prompt( {
      type: 'checkbox',
      message: 'Select records to update',
      name: 'records',
      choices: this.entities.map( entity => ( {
        value: entity,
        name: JSON.stringify( entity, null )
      } ) )
    } )
    return new Update( records, this.data )
  }
}

export { UpdateSelection }
