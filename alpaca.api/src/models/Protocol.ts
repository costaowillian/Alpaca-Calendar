export interface HttpResponse<T> {
  statusCode: httpStatusCode;
  body: T;
}

export enum httpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOTFOUND = 404,
  SERVER_ERROR = 500,
  CREATED = 201
}

export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
