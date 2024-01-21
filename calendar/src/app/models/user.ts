// Interface que define a estrutura de um usuário (IUser)
export interface IUser {
  id: string;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Interface que define a estrutura dos dados de autenticação de um usuário
export interface IUserCredentials {
  email: string;
  senha: string;
}

// Interface que define a estrutura dos dados de criação de um usuário
export interface ICreateUserCredentials {
  firstName: string;
  lastName: string;
  email: string;
  senha: string;
}

// Interface que define a estrutura dos dados em localstorage de um usuário
export interface ILoggedUserData {
  userId: string;
  token: string;
}
