import { app, httpServer } from "./app";
import os from "os";

httpServer.listen(app.get("port"), () => {
  return console.info(`Server is running at port http://${os.networkInterfaces().lo[0].address}:${app.get("port")}`);
});
