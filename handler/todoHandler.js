/* eslint-disable prettier/prettier */
const express = require('express');
const Todo = require('../schemas/todoSchema');

const router = express.Router();

// GET all the todos
router.get('/', async (req, res) => {
  await Todo.find({})
    .select({
      _id: 0,
      __v: 0,
      //   date: 0,
    })
    .exec((err, data) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(200).json({
          result: data,
          message: 'Successfully fetched all the todos',
        });
      }
    });
  // .clone()
  // .catch((err) => console.log(err.message));
});
// GET a single todo by id
router.get('/:id', async (req, res) => {
  await Todo.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({
        result: data,
        message: 'Successfully fetched the todo',
      });
    }
  })
    .clone()
    .catch((err) => console.log(err.message));
});
// POST a single todo
router.post('/', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save((err) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(201).json({ message: 'Todo created successfully' });
    }
  });
});

// POST multiple todo
router.post('/all', async (req, res) => {
  const todos = req.body;
  await Todo.insertMany(todos, (err) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(201).json({ message: 'Todos were created successfully' });
    }
  });
});

// PUT the todo
router.put('/:id', async (req, res) => {
  await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res
          .status(200)
          .json({ result: data, message: 'Todo updated successfully' });
      }
    }
  ).clone((err) => console.log(err.message));
});

// delete the todo
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({ message: 'Todo deleted successfully' });
    }
  }).clone((err) => console.log(err.message));
});

// exports the  module
module.exports = router;
