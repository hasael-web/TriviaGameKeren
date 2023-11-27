import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Users } from "../../entities/Users";
import { AppDataSource } from "../../data-source";
import { TLogin, TRegister } from "../types/Users";
import { register } from "../../utils/joi-validator/usersValidator";

export default new (class UsersServices {
  private readonly UserRepository: Repository<Users> =
    AppDataSource.getRepository(Users);
  async allUsers(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.UserRepository.find();
      console.log(data);

      return res.status(200).json({ status: 200, message: "success", data });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "cannot get all users" });
    }
  }
  //   check user sudah login atau belum menggunakan account google
  async checkUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      const emialAlredy = await this.UserRepository.findOne({
        where: {
          email: email,
        },
      });

      let userHasRegistered: boolean;
      if (emialAlredy) {
        userHasRegistered = true;
        return res
          .status(200)
          .json({ status: 200, message: "success", userHasRegistered });
      }
      userHasRegistered = false;
      return res
        .status(200)
        .json({ status: 200, message: "success", userHasRegistered });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "internal server in checkuser error",
        error,
      });
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { email, username, diamond, totalPoints, password }: TRegister =
        req.body;

      const emailAlredy = await this.UserRepository.findOne({
        where: {
          email: email,
        },
      });

      if (emailAlredy) {
        return res
          .status(404)
          .json({ status: 404, message: `email ${email} already exits` });
      }

      const { error, value } = register.validate({
        email,
        username,
        diamond,
        totalPoints,
      });
      let diamondCount: number;
      let point: number;
      if (value.diamon === null || value.diamon === undefined) {
        diamondCount = 0;
      }

      if (value.totalPoints === null || value.totalPoints === undefined) {
        point = 0;
      }
      if (error) {
        return res.status(404).json({ status: 404, message: "error ", error });
      }
      const data = {
        email: value.email,
        username: value.username,
        diamond: diamondCount || 0,
        totalPoints: point || 0,
        avatar: "",
      };

      const createUser = this.UserRepository.create(data);
      this.UserRepository.save(createUser);

      return res.status(201).json({ status: 201, message: "success", data });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "internal server error on register" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const body: TLogin = req.body;
      return res
        .status(200)
        .json({ status: 200, message: "success", data: "user data" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "internal server error", error });
    }
  }

  async buyAvatar(req: Request, res: Response): Promise<Response> {
    try {
      const { avatar } = req.body;
      const id: number = Number(req.params.idUser);

      if (avatar !== "") {
        return res.status(404).json({
          status: 404,
          message: "something when wrong, cannot buy avater",
        });
      }

      const changeAvatar = await this.UserRepository.findOne({
        where: {
          id,
        },
      });

      if (!changeAvatar) {
        return res
          .status(404)
          .json({ status: 404, message: `cannot find user with id ${id}` });
      }

      const updateAvatar = await this.UserRepository.update(
        changeAvatar.avatar_id.img_src,
        avatar
      );

      return res.status(200).json({
        status: 200,
        message: "success",
        data: updateAvatar,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "internal server error : buy avatar" });
    }
  }
})();
