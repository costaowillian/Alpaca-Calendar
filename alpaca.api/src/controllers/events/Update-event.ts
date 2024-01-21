import { IEvent } from "../../interfaces/Event";
import { EventService } from "../Event-service";
import { badRequest, objectNotCreated, ok, serverError } from "../Helpers";
import { HttpRequest, HttpResponse, IController } from "../Protocols";
import {
  IUpdateEventRepository,
  IUpdateEventParams,
  IGetEventByDateRepository
} from "./Protocols";

// Classe que implementa a lógica para controlar a atualização de um evento
export class UpdateEventController implements IController {
  private eventService: EventService;
  constructor(
    private readonly updateEventRepository: IUpdateEventRepository,
    private readonly getEventByDateRepository: IGetEventByDateRepository
  ) {
    this.eventService = new EventService(this.getEventByDateRepository);
  }

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
        "end",
        "_userId"
      ];

      // Verifica se algum campo não permitido está presente no corpo da requisição
      const someFieldsNotAllowedToUpdate = Object.keys(updatedBody).some(
        (key) => !AllowedToUpdate.includes(key as keyof IUpdateEventParams)
      );

      // Se houver campos não permitidos, retorna um erro
      if (someFieldsNotAllowedToUpdate) {
        return badRequest("Some received fields is not allowed");
      }

      // Verifica se já existe um evento com a mesma data e hora
      const isEvent = await this.eventService.updateEvent({
        updatedBody
      });

      let event: IEvent;
      // Se existir, verifica o tipo retornado
      if (isEvent && typeof isEvent !== "boolean") {
        //verifica se o id retornado é o mesmo que o id do evento que vai ser atualizado.
        if (isEvent.id == id) {
          // Chama o método do repositório para atualizar o evento
          event = await this.updateEventRepository.update(id, updatedBody);
        } else {
          //retorna erro HTTP 422 caso o id não seja o mesmo
          return objectNotCreated(
            "Event not created, there is an event with the same date and time"
          );
        }
      }

      // Retorna uma resposta HTTP 200 (OK) com o evento atualizado
      return ok<IEvent>(event!);
    } catch (error) {
      // Se ocorrer um erro durante o processo, retorna uma resposta de erro genérico
      return serverError("06");
    }
  }
}
