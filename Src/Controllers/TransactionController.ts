import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import UserModel from "../Models/User.Model";
import { SquarePaymentService } from "../Services/SquarePayment.Service";
import PaymentRepo from "../Repositories/TransactionRepo";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

const TransactionController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!._id;
      const { token, amount } = req.body;

      if (!token || !amount) {
        return res.status(400).json({ message: "Missing token or amount" });
      }

      const payment = await SquarePaymentService.createPayment(token, amount);
      if (!payment || !payment.id) {
        throw new ErrorHandler(
          404,
          "Payment creation failed: missing payment ID"
        );
      }
      const savedPayment = await PaymentRepo.create({
        user: userId,
        provider: "square",
        paymentId: payment!.id,
        amount,
        currency: payment!.amountMoney?.currency || "USD",
        status: payment!.status === "COMPLETED" ? "SUCCESS" : "FAILED",
      });

      if (savedPayment.status === "SUCCESS") {
        const parsedAmount =
          typeof amount === "string" ? parseFloat(amount) : amount;
        await UserModel.findByIdAndUpdate(userId, {
          $inc: { "wallet.balance.amount": parsedAmount },
        });
      }

      res.status(200).json({ success: true, payment: savedPayment });
    } catch (error) {
      next(error);
    }
  },
  query: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: Types.ObjectId | string = req.params.id || req.user!._id;

      const payments = await PaymentRepo.query(id, 10);

      res.status(200).json({ success: true, payments });
    } catch (error) {
      next(error);
    }
  },
};

export default TransactionController;
