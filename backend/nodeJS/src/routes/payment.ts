import { Router } from "express";
import PaymentControllers from "../controllers/PaymentControllers";

const router = Router();

router.post("/payment", PaymentControllers.payment);
router.post("/midtrans-callback", PaymentControllers.midtransCallback);

export default router;
