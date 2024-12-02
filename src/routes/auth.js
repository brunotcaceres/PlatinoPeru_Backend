import express from 'express';
import User from '../models/User.js';

const router = express.Router();


router.post('/', async (req, res) => {
  const { username, password } = req.body;

 
  if (!username || !password) {
    return res.status(400).json({ error: 'El nombre de usuario y la contraseña son obligatorios.' });
  }

  try {
   
    const user = await User.findOne({ where: { nombreUsuario: username } });

   
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    
    if (user.password !== password) {
      return res.status(400).json({ error: 'Contraseña incorrecta.' });
    }

    
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
