/* eslint-disable consistent-return */

const getCallerFile = ( steps = 1 ) => {
  try {
    const prepareStackTrace = Error.prepareStackTrace
    let saveStack: NodeJS.CallSite[] = []
    Error.prepareStackTrace = ( err, stack ) => {
      return prepareStackTrace?.( err, saveStack = stack )
    }
    new Error().stack
    const currentfile = saveStack.shift()?.getFileName()
    let lastfile = currentfile
    steps += 1

    do {
      lastfile = saveStack.shift()?.getFileName()
      --steps
    } while( saveStack.length && steps )

    return lastfile
  } catch ( err ) {}

  return undefined
}

export default getCallerFile
