import { IGetEventsRepository } from "../../controllers/events/Protocols";
import { MongoClient } from "../../database/mongo";
import { IEvent } from "../../interfaces/Event";
import { MongoEvents } from "../Protocols";

export class MongoGetEventsrepository implements IGetEventsRepository {
  async getEvents(userId: string): Promise<IEvent[]> {
    const result = await MongoClient.db
      .collection<MongoEvents>("events")
      .find({ _userId: userId })
      .toArray();

    return result.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString()
    }));
  }
}
