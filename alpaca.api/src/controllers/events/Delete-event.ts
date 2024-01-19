import { IEvent } from "../../interfaces/Event";
import { badRequest, ok, serverError } from "../Helpers";
import { HttpRequest, HttpResponse, IController } from "../Protocols";
import { IDeleteEventParams, IDeleteEventRepository } from "./Protocols";

// Classe que implementa a lógica para controlar a exclusão de um evento
export class DeleteEventController implements IController {
  constructor(private readonly deleteEventRepository: IDeleteEventRepository) {}

  // Método que lida com a requisição para excluir um evento
  async handle(
    httpRequest: HttpRequest<IDeleteEventParams>
  ): Promise<HttpResponse<IEvent | string>> {
    try {
      // Obtém o ID do evento a ser excluído e verifica se está presente na requisição
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing Event id");
      }
      // Chama o método do repositório para excluir o evento
      const event = await this.deleteEventRepository.deleteEvent(id);

      // Se o evento não existir, retorna uma resposta indicando que não foi excluído
      if (!event) {
        return badRequest(
          `Event does not exist and was not deleted with the given ID ${id}`
        );
      }

      // Retorna uma resposta HTTP 200 (OK) com o evento excluído
      return ok<IEvent>(event);
    } catch (error) {
      // Se ocorrer um erro durante o processo, retorna uma resposta de erro genérico
      return serverError("08");
    }
  }
}
