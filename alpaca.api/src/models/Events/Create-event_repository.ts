import { ObjectId } from 'mongodb';
import {
  ICreateEventParams,
  ICreateEventRepository
} from "../../controllers/events/Protocols";
import { MongoClient } from "../../database/mongo";
import { IEvent } from "../../interfaces/Event";
import { MongoEvents } from "../Protocols";

export class MongoCreateEventRepository implements ICreateEventRepository {
  async createEvent(params: ICreateEventParams): Promise<IEvent | null> {
    
    params._userId = new ObjectId(params._userId);

    const { insertedId } = await MongoClient.db
      .collection("events")
      .insertOne(params);

    const event = await MongoClient.db
      .collection<MongoEvents>("events")
      .findOne({ _id: insertedId });

    if (!event) {
      return null;
    }

    const { _id, ...rest } = event;

    return { id: _id.toHexString(), ...rest };
  }
}
