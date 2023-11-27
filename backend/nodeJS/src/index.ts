import { AppDataSource } from "./data-source";

import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config();

// routes
import user_router from "./routes/users-routes";
import paymentRouter from "./routes/payment";
import detailOrderRoute from "../src/routes/UserDetailOrderRouter";

AppDataSource.initialize()
  .then(async () => {
    const port = process.env.PORT || 2112;
    const app = express();
    app.use(express.json());
    app.use("/api/v1.1", user_router);
    app.use("/api/v1.1", paymentRouter);
    app.use("/api/v1.1", detailOrderRoute);

    app.listen(port, () => {
      console.log(`server run on Port ${port} `);
    });
  })
  .catch((error) => console.log(error));
