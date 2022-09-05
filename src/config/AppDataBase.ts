import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataBase = new DataSource({
  name: "developer",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "microservice",
  password: "microservice",
  database: "security-database",
  logging: true,
  dropSchema: false,
  synchronize: false,
  migrationsRun: false,
  entities: ["./src/models/"],
  migrations: ["./src/migration/*.ts"],
});

export { AppDataBase };
