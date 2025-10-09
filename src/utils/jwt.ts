import jwt from "jsonwebtoken";
import { env } from "../config/env";

const JWT_SECRET = env.JWT_SECRET as string;
console.log(JWT_SECRET)

export default function generateJWT(userId: number, role: string): string | void {
    console.log(JWT_SECRET);
    if (!JWT_SECRET) {
        throw new Error("No JWT_SECRET found");
    }
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "7d" });
};

export function validateJWT(token: string) {
    if (!JWT_SECRET) {
        throw new Error("No JWT_SECRET found");
    }
    const payload: any = jwt.verify(token, JWT_SECRET);
    return payload;
}