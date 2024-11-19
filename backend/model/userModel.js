
import { sequelize } from "../config/DB_connection.js";
import { DataTypes } from "sequelize";
export const Users = sequelize.define("Users", {
  user_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
});