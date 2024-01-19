import { IEvent } from "../../interfaces/Event";
import { badRequest, ok, serverError } from "../Helpers";
import { HttpRequest, HttpResponse, IController } from "../Protocols";
import { IUpdateEventRepository, IUpdateEventParams } from "./Protocols";

// Classe que implementa a lógica para controlar a atualização de um evento
export class UpdateEventController implements IController {
  constructor(private readonly updateEventRepository: IUpdateEventRepository) {}

  async handle(
    httpRequest: HttpRequest<IUpdateEventParams>
  ): Promise<HttpResponse<IEvent | string>> {
    try {
      // Verifica se o corpo da requisição está presente
      if (!httpRequest?.body) {
        return badRequest("Missing body");
      }

      // Extrai o campo 'id' e outros campos do corpo da requisição
      const { id, ...updatedBody } = httpRequest.body;

      // Verifica se o ID do evento está presente na requisição
      if (!id) {
        return badRequest("Missing event id");
      }

      // Define os campos permitidos para atualização
      const AllowedToUpdate: (keyof IUpdateEventParams)[] = [
        "description",
        "start",
        "end"
      ];

      // Verifica se algum campo não permitido está presente no corpo da requisição
      const someFieldsNotAllowedToUpdate = Object.keys(updatedBody).some(
        (key) => !AllowedToUpdate.includes(key as keyof IUpdateEventParams)
      );

      // Se houver campos não permitidos, retorna um erro
      if (someFieldsNotAllowedToUpdate) {
        return badRequest("Some received fields is not allowed");
      }

      // Chama o método do repositório para atualizar o evento
      const event = await this.updateEventRepository.update(id, updatedBody);

      // Retorna uma resposta HTTP 200 (OK) com o evento atualizado
      return ok<IEvent>(event);
    } catch (error) {
      // Se ocorrer um erro durante o processo, retorna uma resposta de erro genérico
      console.log(error);
      return serverError("06");
    }
  }
}
