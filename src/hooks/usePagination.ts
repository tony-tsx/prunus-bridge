import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'

import { omit } from '../helpers/object'
import Bridge from '../types/bridge'
import BridgeInstance from '../types/bridge-instance'
import { FindOneOptions } from '../types/bridge-static-find'
import { AnyTarget } from '../types/helpers'

interface Options extends Omit<FindOneOptions<any>, 'take' | 'skip'> {
  page?: number
  take?: number
  auto?: boolean
}

type LoadingStatus = 'sent' | 'void'
type SingleLoadingStatus = LoadingStatus | 'done'

interface Action { type: symbol, data?: any }

const COUNT_START = Symbol( 'count-start' )
const SET_COUNT_REQUEST_RESULT = Symbol( 'count-request-result' )
const LOADING_START = Symbol( 'loading-start' )
const SET_REQUEST_RESULT = Symbol( 'set-request-result' )
const SET_REQUEST_ERROR = Symbol( 'set-request-error' )

const reducer = <E extends AnyTarget, S extends any, I extends any>(
  state: usePagination.State<E, S, I>,
  { data, type }: Action
): usePagination.State<E, S, I> => {
  switch ( type ) {
    case COUNT_START:
      return { ...state, loadingCountStatus: 'sent' }
    case SET_COUNT_REQUEST_RESULT:
      return { ...state, loadingCountStatus: 'done', count: data }
    case LOADING_START:
      return {
        ...state,
        loadingStatus: 'sent',
        firstLoadingStatus: state.firstLoadingStatus === 'void' ? 'sent' : state.firstLoadingStatus
      }
    case SET_REQUEST_RESULT:
      return {
        ...state,
        loadingStatus: 'void',
        firstLoadingStatus: state.firstLoadingStatus === 'sent' ? 'done' : state.firstLoadingStatus,
        entities: state.entities.concat( data ),
        nextPage: state.nextPage + 1
      }
    case SET_REQUEST_ERROR:
      return {
        ...state,
        errors: state.errors.concat( data ),
        loadingStatus: 'void',
        firstLoadingStatus: state.firstLoadingStatus === 'sent' ? 'done' : state.firstLoadingStatus,
        loadingCountStatus: state.loadingCountStatus === 'sent' ? 'done' : state.loadingCountStatus,
      }
    default: return state
  }
}

const usePagination = <E extends AnyTarget, S, I>(
  bridge: Bridge<E, S, I>,
  options: Options = {}
) => {
  const [ state, dispatch ] = useReducer( reducer, {
    count: NaN,
    loadingStatus: 'void',
    firstLoadingStatus: 'void',
    loadingCountStatus: 'void',
    entities: [] as BridgeInstance<E, S, I>[],
    nextPage: 0,
    errors: []
  } as usePagination.State<E, S, I> )

  const { entities, nextPage, loadingStatus, firstLoadingStatus, count, loadingCountStatus, errors }
    = state as usePagination.State<E, S, I>

  const take = useMemo( () => options.take ?? 20, [ options.take ] )
  const skip = useMemo( () => take * nextPage, [ take, nextPage ] )
  const page = useMemo( () => nextPage ? nextPage - 1 : NaN, [ nextPage ] )
  const auto = useMemo( () => options.auto ?? true, [ options.auto ] )
  const error = useMemo( () => errors.length ? errors[errors.length - 1] : null, [ errors ] )
  const autoRequest = useMemo( () => firstLoadingStatus === 'void' && auto, [ firstLoadingStatus, auto ] )
  const end = useMemo( () => entities.length === count, [ entities.length, count ] )
  const loading = useMemo( () => loadingStatus === 'sent', [ loadingStatus ] )
  const enableNext = useMemo( () => loadingStatus === 'void' && !end, [ loadingStatus, end ] )
  const enableFirstNext = useMemo( () => firstLoadingStatus === 'void', [ firstLoadingStatus ] )

  const opts = useRef( omit( options, 'page', 'take', 'auto' ) )

  const findOptions = useMemo( () => ( { ...opts.current, take, skip } ), [] )

  const next = useCallback( async () => {
    if ( enableFirstNext || enableNext ) {
      try {
        dispatch( { type: LOADING_START } )
        dispatch( { type: SET_REQUEST_RESULT, data: await bridge.find( findOptions ) } )
      } catch ( e ) {
        dispatch( { type: SET_REQUEST_ERROR, data: e } )
      }
    }
  }, [ findOptions, firstLoadingStatus, enableNext, enableFirstNext, loading ] )

  useEffect( () => {
    if ( loadingCountStatus !== 'void' ) return void 0
    dispatch( { type: COUNT_START } )
    bridge
      .count( opts.current )
      .then( count => dispatch( { type: SET_COUNT_REQUEST_RESULT, data: count } ) )
      .catch( reason => dispatch( { type: SET_REQUEST_ERROR, data: reason } ) )
  }, [ loadingCountStatus ] )

  useEffect( () => void ( autoRequest && next() ), [ autoRequest, next ] )

  return useMemo(
    () => ( { entities, page, end, error, errors, loading, count, next } ),
    [ entities, page, end, error, errors, loading, count, next ]
  )
}

namespace usePagination {
  export interface State<E extends AnyTarget, S, I> {
    entities: BridgeInstance<E, S, I>[]
    nextPage: number
    loadingStatus: LoadingStatus
    firstLoadingStatus: SingleLoadingStatus
    loadingCountStatus: SingleLoadingStatus
    count: number
    errors: Error[]
  }
}

export default usePagination
