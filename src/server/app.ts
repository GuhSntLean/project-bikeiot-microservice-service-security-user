import express from "express";
import bodyParser from "body-parser";
import http from "http";

const app = express();
const appPort = process.env.PORT || 3000;

const httpServer = http.createServer(app);

app.set("port", appPort);

app.use(express.json());

export { app, httpServer };
