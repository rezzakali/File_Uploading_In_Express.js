/* eslint-disable prettier/prettier */
const express = require('express');
const multer = require('multer');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;
const app = express();
const uploadFile = './Files';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFile);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = `${file.originalname
      .replace(fileExt, '')
      .toLowerCase()
      .split(' ')
      .join('-')}-${Date.now()}`;
    cb(null, fileName + fileExt);
  },
});

const uploads = multer({
  storage,
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'avatar') {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'
      ) {
        cb(null, true);
      } else {
        cb(new Error('Only .jpg , .png or .jpeg format allowed!'));
      }
    } else if (file.fieldname === 'docs') {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Only .pdf format allowed!'));
      }
    }
  },
});

app.post(
  '/',
  uploads.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'docs', maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.files);
    res.send('Home Page');
  }
);

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send('success');
  }
});

app.listen(port, hostname, () => {
  console.log(
    `your server is running successfully at http://${hostname}:${port}`
  );
});
