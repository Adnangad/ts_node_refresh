import { Sequelize, Model, DataType, DataTypes } from "sequelize";
import UserModel from "./users";
import TaskModel from "./tasks";


export const initModels = (sequelize: Sequelize) => {
    const User = UserModel(sequelize);
    const Task = TaskModel(sequelize);

    User.hasMany(Task, {
        foreignKey: 'userId',
        as: 'tasks',
        onDelete: 'CASCADE'
    });

    Task.belongsTo(User, {
        foreignKey: 'userId',
        as: "user"
    });
};