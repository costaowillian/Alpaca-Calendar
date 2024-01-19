import { IEvent } from "../interfaces/Event";
import { IGetEventByDateRepository } from "./events/Protocols";

export class EventService {
  constructor(
    private readonly getEventByDateRepository: IGetEventByDateRepository
  ) {}

  async updateEvent(params: any): Promise<boolean | IEvent> {
    try {
      // Verifica se já existe um evento com a mesma data e hora
      const isEvent = await this.getEventByDateRepository.getEvent({
        _userId: params.updatedBody?._userId || params.body?._userId,
        start: params.updatedBody?.start || params.body?.start,
        end: params.updatedBody?.end || params.body?.end
      });

      // Se existir, retorna uma resposta indicando que o evento existe e se a requisição foi de update retorna o evento encontrado
      if (isEvent) {
        if (params.updatedBody) {
          return isEvent;
        }
        return true;
      }

      return false;
    } catch (error) {
      // retorna uma resposta de erro genérico
      throw Error("error 500");
    }
  }
}
