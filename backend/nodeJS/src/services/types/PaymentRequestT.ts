const user_order = {
  order_id: "qq-23123-djdkjj",
  first_name: "hasael",
  last_name: "butar butar",
  email: "hasael@butar.com",
  phone: "082256223722",
};
const user_item_detail = {
  id_item: "dd-dshfashfdh",
  name: "Datang dan Dapatkan Diamond Murah",
  price: 70000,
  quantity: 4,
  brand: "Trivia Top-Up",
  category: "Diamond-game",
  merchant_name: "Trivia-Game",
};

export type PaymentRequestT = {
  user_order: {
    first_name: "hasael";
    last_name: "butar butar";
    email: "hasael@butar.com";
    phone: "082256223722";
  };
  user_item_detail: {
    id_item: string;
    name: string;
    price: number;
    quantity: number;
    brand: string;
    category: string;
    merchant_name: string;
  };
  user_id: number;
};
