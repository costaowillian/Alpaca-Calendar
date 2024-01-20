// Interface que define a estrutura de um usuário (IUser)
export interface IUser {
  id: string;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUserCredentials {
  email: string;
  senha: string;
}
