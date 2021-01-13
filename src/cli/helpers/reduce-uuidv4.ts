const lengths = [ 8, 13, 18, 23 ]

const reduceUuidv4 = ( list: string[] ) => {
  let index = -1
  let secure = false
  do {
    ++index
    const ids = list.map( id => id.substr( 0, lengths[index] ) )
    secure = ids.every( ( id, index, ids ) => {
      const lids = [ ...ids.slice( 0, index ), ...ids.slice( index + 1 ) ]
      return !lids.includes( id )
    } )
  } while ( !secure || index >= lengths.length )

  if ( !secure ) return 36

  return lengths[index]
}

reduceUuidv4.keyBuilder = ( list: string[] ) => {
  const length = reduceUuidv4( list )
  return ( key: string ) => key.slice( 0, length )
}

reduceUuidv4.isReduced = ( key: string ) => lengths.includes( key.length )

export default reduceUuidv4
