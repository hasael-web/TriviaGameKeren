import { Router } from "express";
import UserDetailItemOrderController from "../controllers/UserDetailItemOrderController";

const router = Router();

router.get("/detail-order", UserDetailItemOrderController.findAll);

export default router;
