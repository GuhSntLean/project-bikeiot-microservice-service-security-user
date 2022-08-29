import "dotenv/config";
import "reflect-metadata";
import { ConnectionOptions } from "tls";
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
  migrations: ["./src/migrations/*.ts"],
});

export { AppDataBase };
