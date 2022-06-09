/* eslint-disable prettier/prettier */
const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./handler/todoHandler');

// creating the express app
const app = express();
app.use(express.json());

// configuration
const hostname = '127.0.0.1';
const port = 3000;

// database connection
mongoose
  .connect('mongodb://localhost/todo')
  .then(() => {
    console.log('connection successfully established');
  })
  .catch((err) => console.log(err.message));
// calling the app to use the todoHandler
app.use('/todo', todoHandler);

// simple route
app.get('/', (req, res) => {
  res.send('Home Page');
});
// error handling
// eslint-disable-next-line consistent-return
app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ message: err.message });
});

// listening the server
app.listen(port, hostname, () => {
  console.log(
    `Your server is running successfully at http://${hostname}:${port}`
  );
});
