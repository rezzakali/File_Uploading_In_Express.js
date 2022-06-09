/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// creating the model of the schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
