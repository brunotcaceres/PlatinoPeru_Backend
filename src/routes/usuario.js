import express from 'express';
import User from '../models/User.js'; 
import { Op } from 'sequelize';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, nombreUsuario, password } = req.body;

        const existingUser = await User.findOne({
            where: { 
                [Op.or]: [{ email }, { nombreUsuario }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'El correo o el nombre de usuario ya están en uso.' });
        }

        const user = await User.create({
            email,
            nombreUsuario,
            password, 
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Buscar al usuario por nombre de usuario o email
      const user = await User.findOne({
        where: { 
          [Op.or]: [{ email: username }, { nombreUsuario: username }]
        }
      });
  
      if (!user) {
        return res.status(400).json({ error: 'Usuario no encontrado.' });
      }
  
      // Verificar la contraseña (para simplicidad, sin encriptar)
      if (user.password !== password) {
        return res.status(400).json({ error: 'Contraseña incorrecta.' });
      }
  
      res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

export default router;
