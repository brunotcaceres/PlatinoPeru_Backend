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

export default router;
