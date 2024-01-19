import { ObjectId } from "mongodb";
import {
  IGetEventByDateParams,
  IGetEventByDateRepository
} from "../../controllers/events/Protocols";
import { MongoEvents } from "../Protocols";
import { IEvent } from "../../interfaces/Event";
import { MongoClient } from "../../database/mongo";

export class MongoGetEventByDateRepository
  implements IGetEventByDateRepository
{
  async getEvent(params: IGetEventByDateParams): Promise<IEvent | null> {
    const event = await MongoClient.db
      .collection<MongoEvents>("events")
      .findOne({
        _userId: new ObjectId(params._userId),
        start: { $gte: params.start, $lte: params.end },
        end: { $gte: params.start, $lte: params.end }
      });

    if (!event) {
      return null;
    }

    const { _id, ...rest } = event;
    return { id: _id.toHexString(), ...rest };
  }
}
