import { IGetUserRepository } from "../../controllers/user/Protocols";
import { MongoUser } from "../Protocols";
import { IUser } from "../../interfaces/User";
import { MongoClient } from "../../database/mongo";
import { ObjectId } from "mongodb";

export class MongoGetOneUserRepository implements IGetUserRepository {
  async getUser(userId: string): Promise<IUser | null> {
    const user = await MongoClient.db.collection<MongoUser>("users").findOne({
      _id: new ObjectId(userId)
    });

    if (!user) {
      return null;
    }

    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
