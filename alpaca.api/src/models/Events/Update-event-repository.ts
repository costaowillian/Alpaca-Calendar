import { ObjectId } from "mongodb";
import {
  IUpdateEventParams,
  IUpdateEventRepository
} from "../../controllers/events/Protocols";
import { MongoClient } from "../../database/mongo";
import { IEvent } from "../../interfaces/Event";
import { MongoEvents } from "../Protocols";

export class MongoUpdateEventRepository implements IUpdateEventRepository {
  async update(id: string, params: IUpdateEventParams): Promise<IEvent> {
    await MongoClient.db.collection<MongoEvents>("Events").updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          ...params
        }
      }
    );

    const saving = await MongoClient.db
      .collection<MongoEvents>("Events")
      .findOne({
        _id: new ObjectId(id)
      });

    if (!saving) {
      throw Error("Event not updated");
    }

    const { _id, ...rest } = saving;
    return { id: _id.toHexString(), ...rest };
  }
}
