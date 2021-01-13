export const record = <K extends keyof any, V>( keys: K[], value: V ): Record<K, V> =>
  keys.reduce( ( record, key ) => ( { ...record, [key]: value } ), {} as Record<K, V> )
