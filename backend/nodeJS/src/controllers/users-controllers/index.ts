import { Request, Response } from "express";
import usersService from "../../services/users-service";

export default new (class UserController {
  allUsers(req: Request, res: Response) {
    usersService.allUsers(req, res);
  }
  register(req: Request, res: Response) {
    usersService.register(req, res);
  }
  checkUser(req: Request, res: Response) {
    usersService.checkUser(req, res);
  }
  changeAvatar(req: Request, res: Response) {
    usersService.buyAvatar(req, res);
  }
})();
