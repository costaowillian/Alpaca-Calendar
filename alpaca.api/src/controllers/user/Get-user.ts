import { IUser } from "../../interfaces/User";
import { badRequest, notFound, ok, serverError } from "../Helpers";
import { HttpRequest, HttpResponse, IController } from "../Protocols";
import { IGetUserRepository } from "./Protocols";

export class GetOneUserController implements IController {
  constructor(private readonly getUserRepository: IGetUserRepository) {}

  // Método que lida com a requisição para obter um usuário por ID
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<IUser | string>> {
    try {
      // Obtém o ID da requisição e verifica se o ID está presente
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing id");
      }

      // Obtém o usuário do repositório usando o ID e verifica se o usuário foi encontrado
      const user = await this.getUserRepository.getUser(id);

      if (!user) {
        return notFound("User not found");
      }

      // Cria uma versão "saneada" do usuário, removendo informações sensíveis e retorna uma resposta HTTP 200 (OK) com o usuário encontrado
      const sanitizedUser = {
        firstName: user.firstName,
        lastName: user.lastName
      };

      return ok<IUser>(sanitizedUser);
    } catch (error) {
      // Trata erros e retorna uma resposta de erro genérico
      return serverError("02");
    }
  }
}
