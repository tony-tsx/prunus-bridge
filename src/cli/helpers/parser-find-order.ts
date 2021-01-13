const parserFindOrder = ( value: string, previous: { [key: string]: 'ASC' | 'DESC' | 1 | -1 } ) => {
  const [ field, order = 'ASC' ] = value.split( ' ' )
  return { ...previous, [field]: order.toUpperCase() }
}

export default parserFindOrder
