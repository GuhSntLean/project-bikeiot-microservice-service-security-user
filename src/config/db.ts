import { Sequelize } from "sequelize";

const dataBase = process.env.DATABASE || "security-database";
const username = process.env.USERNAME || "microservice";
const password = process.env.PASSWORD || "root";

export const sequelize = new Sequelize(dataBase, username, password, {
  dialect: "postgres",
  port: 5432,
});

sequelize.authenticate();
