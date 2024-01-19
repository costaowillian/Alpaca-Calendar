import { IEvent } from "../../interfaces/Event";
import { badRequest, ok, serverError } from "../Helpers";
import { HttpRequest, HttpResponse, IController } from "../Protocols";
import { IGetEventsParams, IGetEventsRepository } from "./Protocols";

// Classe que implementa a lógica para controlar a obtenção de eventos por usuário
export class GetEventsController implements IController {
  constructor(private readonly getEventsRepository: IGetEventsRepository) {}

  // Método que lida com a requisição para obter eventos por usuário
  async handle(
    httpRequest: HttpRequest<IGetEventsParams>
  ): Promise<HttpResponse<IEvent[] | string>> {
    try {
      // Obtém o userId da requisição e verifica se está presente na requisição
      const userId = httpRequest.params.userId;

      if (!userId) {
        return badRequest("Missing Id");
      }

      // Chama o método do repositório para obter os eventos por usuário
      const events = await this.getEventsRepository.getEvents(userId);

      // Retorna uma resposta HTTP 200 (OK) com a lista de eventos
      return ok<IEvent[]>(events);
    } catch (error) {
      // Trata erros e retorna uma resposta de erro genérico
      return serverError("04");
    }
  }
}
