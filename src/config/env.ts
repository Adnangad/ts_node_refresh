import dotenv from "dotenv";
dotenv.config();

export const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PSQL: process.env.PSQL || "",
    PORT: process.env.PORT || 3000
}