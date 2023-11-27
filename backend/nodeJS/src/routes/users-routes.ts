import { Router } from "express";
import usersControllers from "../controllers/users-controllers";

const router = Router();

router.get("/users", usersControllers.allUsers);
router.patch("/user/avatar/:idUser", usersControllers.changeAvatar);
router.post("/register", usersControllers.register);

export default router;
