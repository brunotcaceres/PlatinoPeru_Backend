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


router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } 
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] } 
        });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { email, nombreUsuario } = req.body;

        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { nombreUsuario }],
                id: { [Op.ne]: user.id } 
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'El correo o el nombre de usuario ya están en uso.' });
        }

        
        await user.update(req.body);

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await user.destroy();
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


  

export default router;
