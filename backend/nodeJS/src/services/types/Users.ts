export type TRegister = {
  email: string;
  username: string;
  diamond?: number;
  password?: string;
  totalPoints?: number;
};

export type TLogin = {
  emailORusername: string;
  password: string;
};
