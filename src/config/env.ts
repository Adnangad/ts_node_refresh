import dotenv from "dotenv";
dotenv.config();

console.log("ENV TEST:", process.env.PSQL, process.env.JWT_SECRET);

export const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PSQL: process.env.PSQL || "",
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET
}