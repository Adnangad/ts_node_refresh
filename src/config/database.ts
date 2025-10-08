import { env } from "./env";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(env.PSQL, {
    logging: env.NODE_ENV === "development" ? console.log: false
});