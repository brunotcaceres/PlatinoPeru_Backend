import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Joya = sequelize.define(
    "Joya", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {
            type: DataTypes.ENUM('anillos', 'aros', 'accesorios'),
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material: {
            type: DataTypes.ENUM('Oro', 'Plata', 'Oro con Plata'),
            allowNull: false
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
        }, {
        freezeTableName: true,
        timestamps: true
});

module.exports = Joya;
