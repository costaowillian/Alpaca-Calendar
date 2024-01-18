import { IUser } from "../../interfaces/User";
import { ok, serverError } from "../Helpers";
import { IController, HttpResponse } from "../Protocols";
import { IGetUsersRepository } from "./Protocols";

export class GetUserController implements IController {
  constructor(private readonly getUserRepository: IGetUsersRepository) {}

  async handle(): Promise<HttpResponse<IUser[] | string>> {
    try {
      // Obtém a lista de usuários do repositório
      const user = await this.getUserRepository.getUsers();

      // Retorna uma resposta HTTP 200 (OK) com a lista de usuários
      return ok<IUser[]>(user);
    } catch (error) {
      // Trata erros e retorna uma resposta de erro genérico
      return serverError("01");
    }
  }
}
