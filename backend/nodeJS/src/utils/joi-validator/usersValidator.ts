import * as Joi from "joi";

export const register = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  diamond: Joi.number(),
  totalPoints: Joi.number(),
});
