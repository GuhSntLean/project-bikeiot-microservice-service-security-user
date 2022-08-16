import { app, httpServer } from "./app";
import os from "os";
import { sequelize } from "../config/database";

try {
  const account = async () => {
    await sequelize.authenticate();
  };

  if (account) {
    console.log("Connection has been astablished successfully");
  }

  httpServer.listen(app.get("port"), () => {
    return console.info(
      `Server is running at port http://${
        os.networkInterfaces().lo[0].address
      }:${app.get("port")}`
    );
  });
} catch (error) {
  console.error(`Error: ${error}`);
}
