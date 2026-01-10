import type { Types } from "mongoose";
import UserModel from "../Models/User.Model";

class WalletRepo {
  public async query(id: Types.ObjectId | string) {
    return await UserModel.findById(id).select("wallet");
  }
}
export default new WalletRepo();
