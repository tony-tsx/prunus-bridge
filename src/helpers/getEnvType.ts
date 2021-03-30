let envType: 'react-native' | 'browser' | 'nodejs'

if ( typeof document !== 'undefined' ) envType = 'browser'
else if ( typeof navigator !== 'undefined' && navigator.product === 'ReactNative' )
  envType = 'react-native'
else envType = 'nodejs'

const getEnvType = () => envType

export { getEnvType }
