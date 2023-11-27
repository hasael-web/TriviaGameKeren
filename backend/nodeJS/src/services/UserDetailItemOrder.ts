import { Request, Response } from "express";
import { Repository } from "typeorm";
import { UserOrder } from "../entities/UserOrder";
import { AppDataSource } from "../data-source";
import { UserItemDetail } from "../entities/UserItemDetail";
import { Payments } from "../entities/Payments";

export default new (class UserDetailItemOrder {
  private readonly UserOrderRepository: Repository<UserOrder> =
    AppDataSource.getRepository(UserOrder);
  //   private readonly UserItemDetailRepository: Repository<UserItemDetail> =
  //     AppDataSource.getRepository(UserItemDetail);
  //   private readonly PaymentRepository: Repository<Payments> =
  //     AppDataSource.getRepository(Payments);
  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const findUserOrder = await this.UserOrderRepository.find({
        relations: {
          userItemDetail: true,
          payments: true,
        },
      });
      return res.status(200).json({ data: findUserOrder });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "internal server error on findall user detail item order",
        error,
      });
    }
  }
})();
