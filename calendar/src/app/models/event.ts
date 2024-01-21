// Interface que define a estrutura de um evento (IEvet)
export interface IEvent {
  id?: string;
  description: string;
  start: string;
  end: string;
  _userId?: string;
}

export interface ICreateEvent {
  start: string;
  end: string;
}
