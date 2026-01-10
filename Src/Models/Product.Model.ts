import mongoose, { Types } from "mongoose";
import IProduct from "../Interfaces/IProduct";

const ProductSchema = new mongoose.Schema<IProduct.Doc>(
  {
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    forAdult: {
      type: Boolean,
      required: true,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    variants: [
      {
        title: {
          type: String,
          required: true,
        },
        price: {
          amount: {
            type: Number,
            required: true,
          },
          currency: {
            type: String,
            default: "$",
          },
        },
      },
    ],
    image: {
      type: String,
      required: true,
      default:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHx8MA%3D%3D",
    },
  },
  { timestamps: true }
);
const ProductModel = mongoose.model<IProduct.Doc>("Product", ProductSchema);
export default ProductModel;
