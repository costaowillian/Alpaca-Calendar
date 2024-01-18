import { IGetUsersRepository } from "../controllers/user/Protocols";
import { MongoClient } from "../database/mongo";
import { IUser } from "../interfaces/User";
import { MongoUser } from "./Protocols";

export class MongoGetUserRepository implements IGetUsersRepository {
  async getUsers(): Promise<IUser[]> {
    const result = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    return result.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString()
    }));
  }
}
