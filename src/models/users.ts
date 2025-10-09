import { Model, Sequelize, DataTypes } from "sequelize";

export class User extends Model {
    declare id: number;
    declare userName: string;
    declare email: string;
    declare password: string;
    declare isAdmin: boolean;
};

export default (sequelize: Sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users'
        }
    );
    return User;
}
