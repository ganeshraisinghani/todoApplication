const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// CRUD
router.get('/', async (req, res) => res.json(await Todo.find()));
router.post('/', async (req, res) => res.status(201).json(await Todo.create(req.body)));
router.put('/:id', async (req, res) => res.json(await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
