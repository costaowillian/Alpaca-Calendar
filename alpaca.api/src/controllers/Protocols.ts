// Interface que define a estrutura de uma resposta HTTP genérica
export interface HttpResponse<T> {
  statusCode: httpStatusCode;
  body: T;
}

// Enumeração que define códigos de status HTTP comuns
export enum httpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOTFOUND = 404,
  SERVER_ERROR = 500,
  CREATED = 201,
  UNPROCESSABLE_ENTITY = 422
}

// Interface que define a estrutura de uma requisição HTTP genérica
export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

// Interface que define um controlador (Controller) no contexto da arquitetura MVC
export interface IController {
  // Método que lida com uma requisição HTTP e retorna uma resposta
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
