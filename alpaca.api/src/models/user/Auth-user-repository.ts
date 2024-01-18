import { IGetUsersAuthRepository } from "../../controllers/user/Protocols";
import { MongoClient } from "../../database/mongo";
import { IUser } from "../../interfaces/User";
import { MongoUser } from "../Protocols";

export class MongoGetUserAuthRepository implements IGetUsersAuthRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ email: email });

    if (user) {
      const { _id, ...rest } = user;
      return { id: _id.toHexString(), ...rest };
    }

    return null;
  }
}
