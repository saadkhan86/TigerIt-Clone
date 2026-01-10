import { Document, Types } from "mongoose";

export namespace IWishList {
  export interface Doc extends Document {
    bid: Types.ObjectId | string;
    uid: Types.ObjectId | string;
  }
  export interface create {
    bid: Types.ObjectId | string;
    uid: Types.ObjectId | string;
  }
  export interface query {
    id?: Types.ObjectId | string;
    businessId?: Types.ObjectId | string;
    userId?: Types.ObjectId | string;
    page?: number;
    limit?: number;
  }
}
export default IWishList;
