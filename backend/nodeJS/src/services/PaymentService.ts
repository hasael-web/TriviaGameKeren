import axios from "axios";
import { Request, Response, response } from "express";
import { PaymentResponseT } from "./types/PaymentResponseT";
import { PaymentRequestT } from "./types/PaymentRequestT";
import * as crypto from "crypto";
import {
  User_Order,
  User_item_detail,
} from "../utils/joi-validator/PaymentsValidator";
import { Repository } from "typeorm";
import { UserOrder } from "../entities/UserOrder";
import { AppDataSource } from "../data-source";
import { UserItemDetail } from "../entities/UserItemDetail";
import { Payments } from "../entities/Payments";
import { MidtransCallbackT } from "./types/MidtransCallbackT";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

export default new (class PaymentService {
  private readonly UserOrderRepository: Repository<UserOrder> =
    AppDataSource.getRepository(UserOrder);
  private readonly UserItemDetail: Repository<UserItemDetail> =
    AppDataSource.getRepository(UserItemDetail);
  private readonly PaymentsRepository: Repository<Payments> =
    AppDataSource.getRepository(Payments);
  async payment(req: Request, res: Response): Promise<Response> {
    try {
      const body: PaymentRequestT = req.body;

      const { user_item_detail, user_order, user_id } = body;
      const { email, first_name, last_name, phone } = user_order;
      const order_id = uuidv4();

      const { value: VUO, error: EVUO } = User_Order.validate({
        email,
        first_name,
        last_name,
        phone,
        order_id,
      });
      if (EVUO) {
        return res.status(404).json({ status: 404, message: EVUO });
      }
      const { value: VUID, error: EVUID } =
        User_item_detail.validate(user_item_detail);
      if (EVUID) {
        return res.status(404).json({ status: 404, message: EVUID });
      }

      // const { value: UI, error: EUI } = User_Id_Validate.validate(user_id);

      let paymentResponse: PaymentResponseT;
      let errorAxiosPostPayment: any;

      await axios
        .post("http://localhost:3003/api/payment", {
          user_order: VUO,
          user_item_detail: VUID,
        })
        .then(function (response) {
          paymentResponse = response.data;
        })
        .catch((error) => {
          errorAxiosPostPayment = error;
        });

      if (paymentResponse) {
        const UserOrderCreate = this.UserOrderRepository.create({
          order_id: order_id,
          email: user_order.email,
          first_name: user_order.first_name,
          last_name: user_order.last_name,
          phone: user_order.phone,
          status: "pending",
        });

        await this.UserOrderRepository.save(UserOrderCreate);

        const user_idN: any = Number(user_id);

        const UserItemDetail = this.UserItemDetail.create({
          id_item: user_item_detail.id_item,
          price: user_item_detail.price,
          quantity: user_item_detail.quantity,
          category: user_item_detail.category,
          name: user_item_detail.name,
          brand: user_item_detail.brand,
          merchant_name: user_item_detail.merchant_name,
          user_id: user_idN,
        });

        await this.UserItemDetail.save(UserItemDetail);

        const PaymentCreate = this.PaymentsRepository.create({
          user_id: user_idN,
        });

        await this.PaymentsRepository.save(PaymentCreate);
        return res.status(200).json({
          status: 200,
          message: "success",
          data: paymentResponse,
        });
      }
      return res.status(400).json({
        status: 400,
        message: "error because of axios",
        data: errorAxiosPostPayment,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "internal server error on payment service",
        error,
      });
    }
  }

  createSignature(order_id, status_code, gross_amount, serverKey) {
    // Menggabungkan data menjadi satu string
    const data = order_id + status_code + gross_amount + serverKey;

    // Membuat hash SHA-512
    const hash = crypto.createHash("sha512");

    // Memperbarui hash dengan data
    const signature = hash.update(data, "utf-8");

    // Menghasilkan signature dalam format hexadecimal
    return signature.digest("hex");
  }

  async midtransCallback(req: Request, res: Response): Promise<Response> {
    try {
      const data: MidtransCallbackT = req.body;

      const { order_id, status_code, gross_amount, signature_key } = data;
      const hashed = this.createSignature(
        order_id,
        status_code,
        gross_amount,
        process.env.M_SERVER_KEY
      );

      if (hashed == signature_key) {
        const updateStatusOrder = await this.UserOrderRepository.findOne({
          where: {
            order_id: order_id,
          },
        });
        if (!updateStatusOrder) {
          return res
            .status(404)
            .json({ status: 404, message: "order_id not found" });
        }

        const currentDate: Date = new Date(data.expiry_time);
        const dateNow: Date = new Date();

        if (data.transaction_status === "expire") {
          updateStatusOrder.status = "expire";
        }

        if (data.transaction_status === "capture") {
          updateStatusOrder.status = "paid";
        }

        if (data.transaction_status === "pending") {
          updateStatusOrder.status = "pending";
        }

        await this.UserOrderRepository.save(updateStatusOrder);
        return res.status(200).json({
          status: "200",
          message: "success",
        });
      }
      return res.status(404).json({
        status: 404,
        message: "something when wrong on midtrans callback",
        signature_key,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "internal server error on midtrans callback",
        error,
      });
    }
  }
})();
