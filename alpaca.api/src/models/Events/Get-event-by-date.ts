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
        $or: [
          {
            $and: [
              { start: { $gte: params.start } },
              { start: { $lt: params.end } }
            ]
          },
          {
            $and: [
              { end: { $gt: params.start } },
              { end: { $lte: params.end } }
            ]
          },
          {
            $and: [
              { start: { $lte: params.start } },
              { end: { $gte: params.end } }
            ]
          },
          {
            $and: [
              { start: { $lte: params.start } },
              { end: { $gte: params.end } }
            ]
          }
        ]
      });

    if (!event) {
      return null;
    }

    const { _id, ...rest } = event;
    return { id: _id.toHexString(), ...rest };
  }
}
