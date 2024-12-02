import express from 'express';
import Joya from '../models/Joyas.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const joya = await Joya.create(req.body);
    res.status(201).json(joya);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const joyas = await Joya.findAll();
    res.json(joyas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const joya = await Joya.findByPk(req.params.id);
    if (!joya) {
      return res.status(404).json({ error: 'Joya no encontrada' });
    }
    await joya.update(req.body);
    res.json(joya);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const joya = await Joya.findByPk(req.params.id);
    if (!joya) {
      return res.status(404).json({ error: 'Joya no encontrada' });
    }
    await joya.destroy();
    res.json({ message: 'Joya eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
