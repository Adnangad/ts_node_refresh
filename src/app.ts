// This module setsup the server
import express from "express";
import type { Request, Response } from "express";
import { router } from "./routes/route";

export const app = express();

const port = 3000;


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    console.log("YESS");
    res.send("Hello World!!");
});

app.use('/db', router);


