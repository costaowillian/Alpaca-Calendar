import {
  CreateUserParams,
  ICreateUserRepository
} from "../controllers/user/Protocols";
import { MongoClient } from "../database/mongo";
import { IUser } from "../interfaces/User";
import { MongoUser } from "./Protocols";

export class MongoCreateUserReporitory implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<IUser> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("user not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
