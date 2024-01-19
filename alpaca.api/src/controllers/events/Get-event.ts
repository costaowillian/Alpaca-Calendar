import { IEvent } from "../../interfaces/Event";
import { badRequest, notFound, ok, serverError } from "../Helpers";
import { HttpRequest, HttpResponse, IController } from "../Protocols";
import { IGetEventRepository, IGetEventsParams } from "./Protocols";

// Classe que implementa a lógica para controlar a obtenção de informações específicas de um evento
export class GetEventController implements IController {
  constructor(private readonly getEventRepository: IGetEventRepository) {}

  // Método que lida com a requisição para obter informações específicas de um evento
  async handle(
    httpRequest: HttpRequest<IGetEventsParams>
  ): Promise<HttpResponse<IEvent | string>> {
    try {
      // Obtém o ID do evento da requisição eerifica se está presente na requisição
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing id");
      }

      // Chama o método do repositório para obter informações sobre o evento
      const event = await this.getEventRepository.getEvent(id);
      console.log({ event });

      // Se o evento não for encontrado, retorna uma resposta 404 (Not Found)
      if (!event) {
        return notFound("Not found");
      }

      // Retorna uma resposta HTTP 200 (OK) com as informações sobre o evento
      return ok<IEvent>(event);
    } catch (error) {
      // Trata erros e retorna uma resposta de erro genérico
      return serverError("05");
    }
  }
}
