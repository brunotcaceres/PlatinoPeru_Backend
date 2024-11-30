import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize("dbplatino", "postgres", "postgres", {
    host: "localhost",
    dialect: "postgres"
});