import { InsertDeleteField } from './InsertDeleteField'
import { InsertEdit } from './InsertEdit'
import { Interactive } from './Interactive'

class Insert extends Interactive {
  constructor( private data: any ) {
    super()
  }
  public question = async () => {
    const choices: any[] = [
      { name: 'Yes', value: 'yes', short: 'yes', key: 'y' },
      { name: 'No', value: 'no', short: 'no', key: 'n' },
      { type: 'separator' },
      { name: 'Edit, edit or add field to data', value: 'edit', short: 'edit', key: 'e' },
    ]

    if ( Object.keys( this.data ).length )
      choices.push( { name: 'Delete, delete field from data', value: 'delete', short: 'delete', key: 'd' } )

    console.log( this.data )

    const { option } = await this.inquirer.prompt( {
      type: 'expand',
      message: 'Insert this data to table?',
      name: 'option',
      choices: choices
    } )

    if ( option === 'edit' ) return new InsertEdit( this.data )
    if ( option === 'delete' ) return new InsertDeleteField( this.data )
    if ( option === 'no' ) return console.log( 'ok' )
    if ( option === 'yes' ) return console.log( await this.bridge.insertOneAndFind( this.data ) )
  }
}

namespace Insert {}

export { Insert }
