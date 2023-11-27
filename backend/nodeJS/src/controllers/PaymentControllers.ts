import { Request, Response } from "express";
import PaymentService from "../services/PaymentService";

export default new (class Paymentcontroller {
  async payment(req: Request, res: Response) {
    PaymentService.payment(req, res);
  }
  async midtransCallback(req: Request, res: Response) {
    PaymentService.midtransCallback(req, res);
  }
})();
