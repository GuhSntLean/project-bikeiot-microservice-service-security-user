import express from "express";
import http from "http";
import { sequelize } from "../config/database";

const app = express();
const appPort = process.env.PORT || 3000;

const httpServer = http.createServer(app);

app.set("port", appPort);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export { app, httpServer };
