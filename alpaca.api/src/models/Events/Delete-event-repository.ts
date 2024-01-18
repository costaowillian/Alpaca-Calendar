import { ObjectId } from "mongodb";
import { IDeleteEventRepository } from "../../controllers/events/Protocols";
import { IEvent } from "../../interfaces/Event";
import { MongoEvents } from "../Protocols";
import { MongoClient } from "../../database/mongo";

export class MongoDeleteEventRepository implements IDeleteEventRepository {
  async deleteEvent(id: string): Promise<IEvent | null> {
    const event = await MongoClient.db
      .collection<MongoEvents>("Event")
      .findOne({ _id: new ObjectId(id) });

    if (!event) {
      return null;
    }

    const { deletedCount } = await MongoClient.db
      .collection<MongoEvents>("Event")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      return null;
    }

    const { _id, ...rest } = event;

    return { id: _id.toHexString(), ...rest };
  }
}
