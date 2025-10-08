import { Router } from "express";
import { User } from "../models/users";

export const router = Router();

router.get("/jobId:jobid", (req, res)=> {
    const data = req.params.jobid;
    console.log("Received:: ", data);
    res.json({"message": "Received"});
});

router.post("/create_user", (req, res) => {
    const name = req.body.userName;
    const email = req.body.email
    console.log("RECEIVED:: ", name, email);
    res.send("Success");
})