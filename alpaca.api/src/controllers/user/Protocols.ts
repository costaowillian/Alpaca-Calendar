import { IUser } from "../../interfaces/User";

// Interface que define métodos para obter todos os usuários
export interface IGetUsersRepository {
  getUsers(): Promise<IUser[]>;
}

// Interface que define um método para obter um usuário por ID
export interface IGetUserRepository {
  getUser(id: string): Promise<IUser | null>;
}

// Interface que define a estrutura dos parâmetros para criar um usuário
export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Interface que define métodos para criar um usuário
export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<IUser>;
}

// Interface que define um método para procurar um usuário pelo e-mail
export interface IGetUsersAuthRepository {
  findByEmail(email: string): Promise<IUser | null>;
}
