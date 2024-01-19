import { EventService } from "./../Event-service";
import { IEvent } from "../../interfaces/Event";
import { badRequest, created, objectNotCreated, serverError } from "../Helpers";
import { HttpRequest, HttpResponse, IController } from "../Protocols";
import {
  ICreateEventParams,
  ICreateEventRepository,
  IGetEventByDateRepository
} from "./Protocols";

// Classe que implementa a lógica para controlar a criação de um evento
export class CreateEventController implements IController {
  private eventService: EventService;
  constructor(
    private readonly createEventRepository: ICreateEventRepository,
    private readonly getEventByDateRepository: IGetEventByDateRepository
  ) {
    this.eventService = new EventService(this.getEventByDateRepository);
  }

  // Método que lida com a requisição para criar um evento
  async handle(
    httpRequest: HttpRequest<ICreateEventParams>
  ): Promise<HttpResponse<IEvent | string>> {
    try {
      // Obtém o corpo da requisição e verifica se está presente
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing Body");
      }

      // Verifica se os campos obrigatórios estão presentes e não estão vazios
      const requiredFields = ["_userId", "description", "start", "end"];

      for (const field of requiredFields) {
        const fieldValue = body?.[field as keyof ICreateEventParams];
        if (
          fieldValue === undefined ||
          (typeof fieldValue === "string" && !fieldValue.trim())
        ) {
          return badRequest(`Field ${field} is required`);
        }
      }

      // Verifica se já existe um evento com a mesma data e hora
      const isEvent = await this.eventService.updateEvent({
        body
      });
      // Se existir, retorna uma resposta indicando que o evento não foi criado
      if (isEvent) {
        return objectNotCreated(
          "Event not created, there is an event with the same date and time"
        );
      }

      // Chama o método do repositório para criar o evento Retorna uma resposta HTTP 201 (Created) com o evento criado
      const event = await this.createEventRepository.createEvent(body);
      return created<IEvent>(event);
    } catch (error) {
      return serverError("08");
    }
  }
}
