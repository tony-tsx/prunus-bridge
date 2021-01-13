import { record } from './helpers'

const labels = {
  ...record( [ 'Not', 'not' ], 'Not' as const ),
  ...record( [ 'LessThan', 'lessThan', '<' ], 'LessThan' as const ),
  ...record( [ 'LessThanOrEqual', 'lessThanOrEqual', '<=' ], 'LessThanOrEqual' as const ),
  ...record( [ 'MoreThan', 'moreThan', '>' ], 'MoreThan' as const ),
  ...record( [ 'MoreThanOrEqual', 'moreThanOrEqual', '>=' ], 'MoreThanOrEqual' as const ),
  ...record( [ 'Equal', 'equal', '=' ], 'Equal' as const ),
  ...record( [ 'Like', 'like' ], 'Like' as const ),
  ...record( [ 'Between', 'between' ], 'Between' as const ),
  ...record( [ 'In', 'in' ], 'In' as const ),
  ...record( [ 'Any', 'any' ], 'Any' as const ),
  ...record( [ 'IsNull', 'isNull', 'null' ], 'IsNull' as const ),
  ...record( [ 'Raw', 'raw' ], 'Raw' as const ),
}

export default labels
