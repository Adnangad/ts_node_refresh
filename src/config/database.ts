import { env } from "./env";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(env.PSQL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // for Neon
        },
    },
    pool: {
        max: 3,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: env.NODE_ENV === "development" ? console.log : false
});