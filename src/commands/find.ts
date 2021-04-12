import { FindManyOptions } from 'typeorm'

import { BridgeCommand } from './BridgeCommand'
import { clearObject, parseWhere } from './helpers'

class FindCommand extends BridgeCommand {
  constructor() {
    super( 'find' )
    this.option( '-s, --select <column>', '', ( v, p: string[] = [] ) => p.concat( v.split( /[, ]/g ) ) )
    this.option( '-r, --relation <relation>', '', ( v, p: string[] = [] ) => p.concat( v.split( /[, ]/g ) ) )
    this.option( '-o, --order <cast>', '', ( v, p: { [key: string]: 'ASC' | 'DESC' } = {} ) => {
      const [ column, order = 'ASC' ] = v.split( /[ =]/ )
      return { ...p, [column]: order }
    } )
    this.option( '-j, --skip <qty>', '', v => Number( v ) )
    this.option( '-m, --take <qty>', '', v => Number( v ) )

    this.option( '-t, --transaction', '' )

    this.option( '-c, --cache', '' )
    this.option( '-o, --cache-time', '', v => Number( v ) )
    this.option( '-i, --cache-id', '' )

    this.option( '-d, --with-deleted', '' )
    this.option( '-e, --load-eager-relations', '' )
    this.option( '-u, --load-relation-ids', '' )
    this.option( '-l, --lock-mode <mode>', '' )
    this.option( '-g, --lock-version <version>', '', v => {
      if ( isNaN( Number( v ) ) ) return Number( v )
      else if ( !isNaN( new Date( v ).getTime() ) ) return new Date( v )
      return undefined
    } )

    this.option( '-w, --where <predicate>', '', parseWhere )

    this.arguments( '[ids...]' )

    this.action( async ( ids?: string[] ) => {
      const opts = this.opts()
      const options: FindManyOptions<any> = {}
      options.select = opts.select
      options.relations = opts.relations
      options.order = opts.order
      options.skip = opts.skip
      options.take = opts.take
      options.where = opts.where
    
      options.transaction = opts.transaction

      options.cache = opts.cacheTime
        ? opts.cacheId
          ? { id: opts.cacheId, milliseconds: opts.cacheTime }
          : opts.cacheTime
        : opts.cache

      options.lock = opts.lockMode ? { mode: opts.lockMode, version: opts.lockVersion } : undefined
      options.loadEagerRelations = opts.loadEagerRelations
      options.loadRelationIds = opts.loadRelationIds
      options.withDeleted = opts.withDeleted

      if ( ids && ids.length )
        if ( ids.length === 1 )
          console.log( await this.bridge.findOne( ids[0], clearObject( options ) ) )

        else console.log( await this.bridge.findByIds( ids, clearObject( options ) ) )

      else console.log( await this.bridge.find( clearObject( options ) ) )
    } )
  }
}

export { FindCommand }
