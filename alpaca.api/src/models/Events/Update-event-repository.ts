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
    const paramsWithUserId = {
      ...params,
      _userId: new ObjectId(params._userId)
    };

    await MongoClient.db.collection<MongoEvents>("events").updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          ...paramsWithUserId
        }
      }
    );

    const event = await MongoClient.db
      .collection<MongoEvents>("events")
      .findOne({
        _id: new ObjectId(id)
      });

    if (!event) {
      throw Error("Event not updated");
    }

    const { _id, ...rest } = event;
    return { id: _id.toHexString(), ...rest };
  }
}
