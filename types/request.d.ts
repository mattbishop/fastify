import { FastifyLoggerInstance } from './logger'
import { RawServerBase, RawServerDefault, RawRequestDefaultExpression, RequestBodyDefault, RequestQuerystringDefault, RequestParamsDefault, RequestHeadersDefault } from './utils'

export interface RequestGenericInterface {
  Body?: RequestBodyDefault;
  Querystring?: RequestQuerystringDefault;
  Params?: RequestParamsDefault;
  Headers?: RequestHeadersDefault;
}

/**
 * FastifyRequest is an instance of the standard http or http2 request objects.
 * It defaults to http.IncomingMessage, and it also extends the relative request object.
 */
export interface FastifyRequest<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RequestGeneric extends RequestGenericInterface = RequestGenericInterface
> {
  id: any;
  params: RequestGeneric['Params'];
  raw: RawRequest;
  query: RequestGeneric['Querystring'];
  headers: RawRequest['headers'] & RequestGeneric['Headers']; // this enables the developer to extend the existing http(s|2) headers list
  log: FastifyLoggerInstance;
  body: RequestGeneric['Body'];
  ip: string;
  ips?: string[];
  hostname: string;
  url: string;
  method: string;

  // `connection` is a deprecated alias for `socket` and doesn't exist in `Http2ServerRequest`
  connection: RawRequest['socket'];
}
