import { Sequelize } from "sequelize";

const dataBase = "security-database";
const username = "microservice";
const password = "root";

export const sequelize = new Sequelize(dataBase, username, password, {
  dialect: "postgres",
  port: 5432,
});

sequelize.authenticate();
