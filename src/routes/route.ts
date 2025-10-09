import { Router } from "express";
import { User } from "../models/users";
import { Task } from "../models/tasks";
import hashPassword from "../utils/hash";
import generateJWT from "../utils/jwt";
import { sequelize } from "../config/database";
import { myRequest } from "../utils/types";
import { Op } from "sequelize";

export const router = Router();


router.get("/jobId", (req: myRequest, res) => {
    console.log("USER:: ", req.user)
    res.json({ "message": "Received" });
});

router.post("/create_user", async (req, res) => {
    const { userName, email, password, role } = req.body;
    const isAdmin = role === "Admin";
    let transaction;

    try {
        if (!userName || !email || !password || !role) {
            return res
                .status(400)
                .json({ status: 401, message: "Missing some credentials" });
        }

        transaction = await sequelize.transaction();

        const newPass = await hashPassword(password);

        const newUser = await User.create(
            {
                userName,
                email,
                password: newPass,
                isAdmin,
            },
            { transaction }
        );

        const token = generateJWT(newUser.id, role);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        });
        await transaction.commit();

        return res.status(200)
            .json({ status: 200, message: "User successfully added to the database" });
    } catch (error) {
        console.error("Error creating user:", error);

        if (transaction) await transaction.rollback();

        return res.status(500)
            .json({ status: 403, message: "Unable to add user to the system, please try again later" });
    }
});

router.post("/create_task", async (req: myRequest, res) => {
    const taskName = req.body.taskName;
    let transaction;
    try {
        if (!taskName) return res.status(403).json({ status: 403, message: "You are yet to login" });
        if (!req.user) return res.status(403).json({ status: 403, message: "You are yet to login" });
        const user = await User.findByPk(req.user?.id);
        if (!user) return res.status(403).json({ message: "You are not saved in the db, create a new account and try again" })
        transaction = await sequelize.transaction();
        const newTask = await Task.create({ taskName: taskName, userId: user.id }, { transaction });
        transaction.commit()
        return res.status(200).json({ message: "success", task: newTask });
    } catch (err) {
        console.error("Error creating Task:: ", err);
        await transaction?.rollback()
        return res.status(500)
            .json({ status: 403, message: "Unable to create a task, please try again later" });
    }
});

router.get("/get_tasks", async (req: myRequest, res) => {
    try {
        if (!req.user) return res.status(403).json({ status: 403, message: "You are yet to login" });
        const user = await User.findByPk(req.user?.id);
        if (!user) return res.status(403).json({ message: "You are not saved in the db, create a new account and try again" })
        const tasks = await Task.findAll({ where: { userId: user.id } })
        return res.status(200).json({ message: "success", tasks: tasks });
    } catch (err) {
        return res.status(500)
            .json({ status: 403, message: "Unable to fetch  tasks, please try again later" });
    }
});

router.put("/update_task/:taskId", async (req: myRequest, res) => {
    let transaction;
    try {
        const taskId = Number(req.params.taskId);
        if (!taskId) return res.status(403).json({ status: 403, message: "Invalid TaskId" });

        if (!req.user) return res.status(403).json({ status: 403, message: "You are yet to login" });

        const user = await User.findByPk(req.user?.id);
        if (!user) return res.status(403).json({ message: "You are not saved in the db, create a new account and try again" })

        const task = await Task.findOne({ where: { [Op.and]: [{ id: taskId }, { userId: user.id }] } });
        if (!task) return res.status(403).json({ status: 403, message: "No such task exists" });

        transaction = await sequelize.transaction();
        task.accomplished = task.accomplished == true ? false : true;
        await task.save({ transaction });
        await transaction.commit()
        return res.status(200).json({ message: "success", task: task });
    } catch (err) {
        await transaction?.rollback()
        return res.status(500)
            .json({ status: 403, message: "Unable to update task, please try again later" });
    }
})