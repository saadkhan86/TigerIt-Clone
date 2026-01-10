import type { QueryFilter, Types } from "mongoose";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import IUser from "../Interfaces/IUser";
import UserModel from "../Models/User.Model";
import ValidatorUtils from "../Utile/Validator.Util";

class UserRepo {
  public async update(id: Types.ObjectId | string, data: IUser.update) {
    var user: IUser.Doc | null;
   var user = await UserModel.findById(id);
    if (!user) {
      throw new ErrorHandler(404, "user not found");
    }
    if (data.name) {
      user.name = data.name;
    }
    if (data.gender) {
      user.gender = data.gender;
    }
    if (data.deliveryAddress) {
      user.deliveryAddress = data.deliveryAddress;
    }
    if (data.profileImage) {
      const url = await ValidatorUtils.convertToUrl(data.profileImage);
      if (url) {
        user.profileImage = url;
      }
    }
    if (data.dob) {
      user.dob = data.dob;
    }
    return user.save();
  }
  public async query(data: IUser.query) {
    var _query: QueryFilter<IUser.Doc> = {};
    if (data.userId) {
      _query._id = data.userId;
    }
    const { search, limit = 20, page = 1 } = data;
    if (search && search.trim() !== "") {
      _query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    const users = await UserModel.find(_query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return users;
  }
}
export default new UserRepo();
