import { HttpResponse, httpStatusCode } from "./Protocols";

// Função que retorna uma resposta HTTP 200 (OK) com o corpo especificado
export const ok = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: httpStatusCode.OK,
    body: body
  };
};

// Função que retorna uma resposta HTTP 201 (Created) com o corpo especificado
export const created = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: httpStatusCode.CREATED,
    body: body
  };
};

// Função que retorna uma resposta HTTP 400 (Bad Request) com a mensagem de erro especificada
export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: httpStatusCode.BAD_REQUEST,
    body: message
  };
};

// Função que retorna uma resposta HTTP 404 (Not Found) com a mensagem de erro especificada
export const notFound = (message: string): HttpResponse<string> => {
  return {
    statusCode: httpStatusCode.NOTFOUND,
    body: message
  };
};

// Função que retorna uma resposta HTTP 500 (Internal Server Error) com um código interno especificado
export const serverError = (code: string): HttpResponse<string> => {
  return {
    statusCode: httpStatusCode.SERVER_ERROR,
    body: "something went wrong. internal code: " + code
  };
};

// Função que retorna uma resposta HTTP 422 (Unprocessable Entity) com a mensagem de erro especificada
export const objectNotCreated = (message: string): HttpResponse<string> => {
  return {
    statusCode: httpStatusCode.UNPROCESSABLE_ENTITY,
    body: message
  };
};
