import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  name: "security",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "microservice",
  password: "microservice",
  database: "security-database",
  logging: true,
  dropSchema: false,
  migrationsRun: false,
  entities: ["./src/models/*.ts"],
  migrations: ["./src/migrations/*.ts"],
});

export { dataSource };
