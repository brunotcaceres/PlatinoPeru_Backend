import { json } from "express";
import express from "express";
import { sequelize } from "./src/config/database.js"; // Asegúrate de que la ruta sea correcta
import joyaRoutes from "./src/routes/joya.js"; // Importa las rutas de las joyas

const app = express();
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

app.listen(PORT, () => {
    console.log(`Servidor conectado a puerto ${PORT}`);
    verifyAndSyncConexion();
});
