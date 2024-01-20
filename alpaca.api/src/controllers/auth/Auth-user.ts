import { IToken } from "../../interfaces/Token";
import { badRequest, notFound, ok, serverError } from "../Helpers";
import { HttpRequest, HttpResponse, IController } from "../Protocols";
import { LoginUserParams } from "./Protocols";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { IGetUsersAuthRepository } from "../user/Protocols";

// Classe que implementa a lógica para controlar o login de um usuário
export class LoginUserController implements IController {
  // Construtor recebe o repositório necessário para autenticar usuários
  constructor(
    private readonly getUserAuthRepository: IGetUsersAuthRepository
  ) {}

  // Método que lida com a requisição para realizar o login
  async handle(
    httpRequest: HttpRequest<LoginUserParams>
  ): Promise<HttpResponse<IToken | string>> {
    try {
      // Extrai o email e senha da requisição e verifica se estão presentes na requisição
      const { email, password } = httpRequest.body!;

      if (!email) {
        return badRequest("Email is mandatory!");
      }

      if (!password) {
        return badRequest("The password is mandatory!");
      }
      // Busca o usuário no repositório com base no email fornecido, se não for encontrado, retorna um erro 404
      const user = await this.getUserAuthRepository.findByEmail(
        httpRequest.body!.email
      );

      if (!user) {
        return notFound("User not Found");
      }

      // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados, se a senha não corresponder, retorna um erro 400
      const checkPassword = await bcrypt.compare(
        httpRequest.body!.password,
        user.password
      );

      if (!checkPassword) {
        return notFound("Invalid credentials");
      }

      // Obtém a chave secreta do ambiente (certifique-se de configurar essa variável de ambiente)
      const secret = process.env.SECRET ?? "";

      // Gera um token JWT usando o ID do usuário como payload
      const token = jwt.sign(
        {
          id: user.id
        },
        secret
      );

      // Cria uma resposta contendo o token e informações do usuário (sem senha e _id)
      const response = {
        token: token,
        user: {
          ...user,
          password: undefined,
          _id: undefined
        }
      };

      // Retorna uma resposta HTTP 200 (OK) com o token e informações do usuário
      return ok<IToken>(response);
    } catch (error) {
      // Se ocorrer um erro durante o processo, retorna uma resposta de erro genérico
      return serverError("05");
    }
  }
}
