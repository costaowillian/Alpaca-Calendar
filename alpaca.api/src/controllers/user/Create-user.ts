import validator from "validator";
import bcrypt from "bcrypt";

import { IUser } from "../../interfaces/User";
import { badRequest, created, serverError } from "../Helpers";
import { IController, HttpRequest, HttpResponse } from "../Protocols";
import {
  CreateUserParams,
  ICreateUserRepository,
  IGetUsersAuthRepository
} from "./Protocols";

export class CreateUserController implements IController {
  // Construtor recebe os repositórios necessários
  constructor(
    private readonly createUserRepository: ICreateUserRepository,
    private readonly getUserAuthRepository: IGetUsersAuthRepository
  ) {}

  // Método que lida com a requisição de criação de usuário
  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<IUser | string>> {
    try {
      // Lista de campos obrigatórios
      const requiredFields = ["firstName", "lastName", "email", "password"];

      // Verifica se todos os campos obrigatórios estão presentes na requisição
      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      // Valida o formato do e-mail usando a biblioteca 'validator'
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("E-mail is invalid");
      }

      // Verifica se já existe um usuário com o mesmo e-mail
      const userExists = this.getUserAuthRepository.findByEmail(
        httpRequest.body!.email
      );

      if (await userExists) {
        return badRequest("Please use another email!");
      }

      // Gera um salt e realiza o hash da senha
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(httpRequest.body!.password, salt);

      httpRequest.body!.password = passwordHash;

      // Cria o usuário no banco de dados
      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return created<IUser>(user);
    } catch (error) {
      // Trata erros e retorna uma resposta de erro genérico
      return serverError("03");
    }
  }
}
