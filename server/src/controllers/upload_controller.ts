import path = require("path");

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,  '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage
});

exports.upload = upload.single('myFile');

exports.uploadFile = (req, res) => {
    res.send({ data: 'Enviar un archivo' })
};