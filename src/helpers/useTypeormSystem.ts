import { getEnvType } from './getEnvType'

const useTypeormSystem = () => {
  if ( useTypeormSystem._system ) return true
  if ( useTypeormSystem._client ) return false
  return getEnvType() === 'nodejs'
}

useTypeormSystem._system = false
useTypeormSystem._client = false

useTypeormSystem.force = ( t: 'system' | 'client' ) => useTypeormSystem[`_${t}`] = true

export { useTypeormSystem }
