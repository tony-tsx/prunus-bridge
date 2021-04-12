import { AnyBridgeInstance } from '../../typings/bridge'
import { DeleteInformation } from './DeleteInformation'
import { DeleteSelection } from './DeleteSelection'
import { Interactive } from './Interactive'

class Delete extends Interactive {
  public message: string
  public choices: any[]
  constructor( private entities: AnyBridgeInstance[] ) {
    super()
    this.message = this.entities.length > 1 ? `are you sure you want to delete ${this.entities.length} records? ` : 'are you sure you want to delete this record?'
    this.choices = [
      { name: 'Yes', value: 'yes', short: 'yes', key: 'y' },
      { name: 'No', value: 'no', short: 'no', key: 'n' },
      { type: 'separator' },
      {
        name: this.entities.length > 1 ? 'Info, show details about the records' : 'Info, show details about the record ',
        value: 'info',
        short: 'info',
        key: 'i',
      }
    ]
    if ( this.entities.length > 1 ) this.choices.push( {
      name: 'Select, select records to delete',
      value: 'select',
      short: 'select',
      key: 's'
    } )
  }
  public question = async () => {
    if ( !this.entities.length ) return console.log( 'no records to delete' )
    const { option } = await this.inquirer.prompt( {
      type: 'expand',
      message: this.message,
      name: 'option',
      choices: this.choices
    } )
    if ( option === 'info' ) return new DeleteInformation( this.entities )
    if ( option === 'select' ) return new DeleteSelection( this.entities )
    if ( option === 'yes' ) {
      const { softRemove } = await this.inquirer.prompt( {
        type: 'confirm',
        name: 'softRemove',
        message: 'use soft remove?'
      } )
      if ( softRemove )
        await Promise.all( this.entities.map( async entity => await entity.softRemove() ) )

      else await Promise.all( this.entities.map( async entity => await entity.remove() ) )
    }
    if ( option === 'no' ) console.log( 'canceled' )
  }
}

namespace Delete {}

export { Delete }
