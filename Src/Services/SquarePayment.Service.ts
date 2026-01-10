import { squareClient } from "../Config/Square";
import { randomUUID } from "crypto";

export class SquarePaymentService {
  static async createPayment(
    sourceId: string,
    amount: number,
    currency: "USD" | "EUR" = "USD"
  ) {
    const response = await squareClient.payments.create({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(Math.round(amount * 100)),
        currency,
      },
    });

    return response.payment;
  }
}
