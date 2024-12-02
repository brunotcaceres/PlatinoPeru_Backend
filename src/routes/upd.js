import express from 'express';
import User from '../models/User.js'; // Modelo Sequelize del usuario

const router = express.Router();

// Actualizar datos del usuario
router.put('/', async (req, res) => {
  const { id, email, password, nombreUsuario } = req.body;

  try {
    // Encontrar el usuario por ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los campos
    user.email = email || user.email;
    user.password = password || user.password;
    user.nombreUsuario = nombreUsuario || user.nombreUsuario;

    await user.save();
    res.json({ message: 'Perfil actualizado con éxito', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
});

export default router;
