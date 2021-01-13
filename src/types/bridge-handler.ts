import Express from 'express'
import core from 'express-serve-static-core'

import BridgeStatic from './bridge-static'

export type ExtractBridgeRequest<H extends BridgeRequestHandler<any, any, any, any>>
  = H extends ( bridge: any, req: infer Req, ...args: any[] ) => any ? Req : never

export type ExtractBridgeResponse<H extends BridgeRequestHandler<any, any, any, any>>
  = H extends ( bridge: any, req: any, res: infer Res ) => any ? Res : never

export type BridgeRequestHandler<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query
> = ( bridge: BridgeStatic<any>, ...args: Parameters<Express.RequestHandler<P, ResBody, ReqBody, ReqQuery>> ) => void
