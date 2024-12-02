import express from 'express';
import cors from 'cors';
import { json } from "express";
import { sequelize } from "./src/config/database.js";
import joyaRoutes from "./src/routes/joya.js";
import userRoutes from './src/routes/usuario.js';
import authRoutes from './src/routes/auth.js'

const app = express();
app.use(cors());
app.use(json());

const PORT = 4000;

async function verifyAndSyncConexion() {
    try {
        await sequelize.authenticate();
        console.log("Conectado a BD satisfactoriamente");
        await sequelize.sync(/*{ force: true }*/);
    } catch (error) {
        console.log("Error: ", error);
    }
}

app.use('/admin/productos', joyaRoutes);
app.use('/admin/usuarios', userRoutes);
app.use('/login', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor conectado a puerto ${PORT}`);
    verifyAndSyncConexion();
});
