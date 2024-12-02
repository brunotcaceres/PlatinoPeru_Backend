import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize("dbplatino", "postgres", "1234", {
    host: "localhost",
    dialect: "postgres"
});