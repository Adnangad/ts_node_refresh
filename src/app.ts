// This module setsup the server
import express from "express";
import type { Request, Response, NextFunction } from "express";
import { myRequest } from "./utils/types";
import { router } from "./routes/route";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { validateJWT } from "./utils/jwt";

export const app = express();

const port = 3000;

app.use(cookieParser())
app.use(express.json());

app.use('/db', (req: myRequest, res, next: NextFunction) => {
    console.log(req);
    if(req.cookies.token) {
        console.log("Request.cookies is:: ", req.cookies.token);
        const payload = validateJWT(req.cookies.token);
        req.user = {id: payload.userId, role:payload.role};
    }
    else console.log("No cookies found")
    next();
});

app.get('/', (req: Request, res: Response) => {
    console.log("USER::");
    res.send("Hello World!!");
});

app.use('/db', router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error middleware caught:", err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
        stack: env.NODE_ENV === "development" ? err.stack : undefined,
    });
})


