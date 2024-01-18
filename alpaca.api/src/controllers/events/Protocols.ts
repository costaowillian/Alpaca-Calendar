import { IEvent } from "../../interfaces/Event";

// Interface que define os parâmetros para obter eventos por usuário
export interface IGetEventsParams {
  id: string;
}

// Interface que define os parâmetros para criar eventos por usuário
export interface ICreateEventParams {
  _userId: string;
  description: string;
  start: string;
  end: string;
}

// Interface que define os parâmetros para pegar eventos por data
export interface IGetEventByDateParams {
  _userId: string;
  start: string;
  end: string;
}

// Interface que define um repositório para a buscar eventos por data
export interface IGetEventByDateRepository {
  getEvent(params: IGetEventByDateParams): Promise<IEvent | null>;
}

// Interface que define um repositório para a criação de eventos
export interface ICreateEventRepository {
  createEvent(params: ICreateEventParams): Promise<IEvent | null>;
}

// Interface que define os parâmetros para a atualização de um evento
export interface IUpdateEventParams {
  id: string;
  description?: string;
  start?: string;
  end?: string;
}

// Interface que define um repositório para a atualização de eventos
export interface IUpdateEventRepository {
  update(id: string, params: IUpdateEventParams): Promise<IEvent>;
}

// Interface que define um repositório para obter eventos com base no userId
export interface IGetEventsRepository {
  getEvents(userId: string): Promise<IEvent[]>;
}

// Interface que define um repositório para obter informações específicas sobre um evento por meio de seu id
export interface IGetEventRepository {
  getEvent(id: string): Promise<IEvent | null>;
}

// Interface que define os parâmetros para pegar eventos por data
export interface DeleteEventParams {
  id: string;
}

// Interface que define um repositório para obter informações específicas sobre um evento por meio de seu id
export interface IDeleteEventRepository {
  deleteEvent(id: string): Promise<IEvent | null>;
}
