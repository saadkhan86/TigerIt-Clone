import { Types } from "mongoose";

export namespace ITransaction {
  export interface Doc extends Document {
    user: Types.ObjectId | string;
    provider: "square";
    paymentId: string;
    amount: number;
    currency: string;
    status: "SUCCESS" | "FAILED";
    createdAt: Date;
  }
}
export default ITransaction;
