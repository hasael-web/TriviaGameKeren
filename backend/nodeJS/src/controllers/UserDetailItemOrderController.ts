import { Request, Response } from "express";
import UserDetailItemOrder from "../services/UserDetailItemOrder";

export default new (class UserDetailOrderController {
  findAll(req: Request, res: Response) {
    UserDetailItemOrder.findAll(req, res);
  }
})();
