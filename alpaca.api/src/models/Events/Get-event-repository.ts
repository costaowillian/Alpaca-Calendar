import { ObjectId } from "mongodb";
import { IGetEventRepository } from "../../controllers/events/Protocols";
import { MongoClient } from "../../database/mongo";
import { IEvent } from "../../interfaces/Event";
import { MongoEvents } from "../Protocols";

export class MongoGetEventRepository implements IGetEventRepository {
  async getEvent(id: string): Promise<IEvent | null> {
    const event = await MongoClient.db
      .collection<MongoEvents>("events")
      .findOne({
        _id: new ObjectId(id)
      });

    if (!event) {
      return null;
    }

    const { _id, ...rest } = event;
    return { id: _id.toHexString(), ...rest };
  }
}
