import { Model, DataTypes, Sequelize } from "sequelize";

 export class Task extends Model { };

export default (sequelize: Sequelize) => {
    Task.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            taskName: {
                type: DataTypes.STRING,
                unique: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            accomplished: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: "Task",
            tableName: 'tasks'
        }
    );
    return Task;
}
