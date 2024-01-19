import { ObjectId } from "mongodb";
import { IGetEventsRepository } from "../../controllers/events/Protocols";
import { MongoClient } from "../../database/mongo";
import { IEvent } from "../../interfaces/Event";
import { MongoEvents } from "../Protocols";

export class MongoGetAllEventsRepository implements IGetEventsRepository {
  async getEvents(user: string): Promise<IEvent[]> {
    const result = await MongoClient.db
      .collection<MongoEvents>("events")
      .find({ _userId: new ObjectId(user) })
      .toArray();

    return result.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString()
    }));
  }
}
