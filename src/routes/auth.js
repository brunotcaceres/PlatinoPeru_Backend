import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Login route
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  // Validate input fields
  if (!username || !password) {
    return res.status(400).json({ error: 'El nombre de usuario y la contraseña son obligatorios.' });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ where: { nombreUsuario: username } });

    // If user does not exist
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Check if the password matches (plain text comparison)
    if (user.password !== password) {
      return res.status(400).json({ error: 'Contraseña incorrecta.' });
    }

    // Respond with user data
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        nombreUsuario: user.nombreUsuario,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

export default router;
