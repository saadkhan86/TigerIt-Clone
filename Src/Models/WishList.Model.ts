import mongoose, { Types } from "mongoose";
import IWishList from "../Interfaces/IWishList";
const Schema = mongoose.Schema;
const wishListSchema = new Schema<IWishList.Doc>(
  {
    uid: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    bid: {
      type: Types.ObjectId,
      ref: "Business",
      required: true,
    },
  },
  { timestamps: true }
);
const WishListModel = mongoose.model<IWishList.Doc>("WishList", wishListSchema);
export default WishListModel;
