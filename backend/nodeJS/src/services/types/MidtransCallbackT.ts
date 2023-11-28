export type MidtransCallbackT = {
  status_code: string;
  signature_key: string;
  order_id: string;
  merchant_id?: string;
  gross_amount: string;
  transaction_time: string;
  expiry_time: string;
  transaction_status: string;
};
