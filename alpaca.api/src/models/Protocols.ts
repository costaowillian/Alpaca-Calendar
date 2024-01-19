import { IEvent } from "../interfaces/Event";
import { IUser } from "../interfaces/User";

/* Define um novo tipo chamado MongoUser, que é uma versão da interface IUser sem a propriedade "id"
Omit<IUser, "id"> cria um tipo que exclui a propriedade "id" da interface IUser*/
export type MongoUser = Omit<IUser, "id">;
export type MongoEvents = Omit<IEvent, "id", "_userId">;
