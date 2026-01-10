import mongoose from "mongoose";
const Schema = mongoose.Schema;
const WalletSchema = new Schema({
  balance: {
    amount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "$",
    },
  },
});
