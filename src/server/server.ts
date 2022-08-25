import { app, httpServer } from "./app";
import os from "os";
import { dataSource } from "../config/database";

const server = () => {
  try {
    dataSource.initialize().then(() => {
      httpServer.listen(app.get("port"), () => {
        return console.info(
          `Server is running at port http://${
            os.networkInterfaces().lo[0].address
          }:${app.get("port")}`
        );
      });
    })
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

server();
