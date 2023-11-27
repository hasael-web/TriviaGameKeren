export type PaymentResponseT = {
  status: number;
  message: string;
  data: {
    token: string;
    redirect_url: string;
  };
};
