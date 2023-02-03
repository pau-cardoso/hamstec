import path = require("path");
import { AppDataSource } from "../data-source";
import { QuotePdf } from "../entity/QuotePdf";
const multer = require('multer');
const fs = require('fs');

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

export async function uploadFile(req, res) {
  try {
    const quotePdf = await AppDataSource.getRepository(QuotePdf).create({
      quote: req.params.quoteId,
      filename: req.file.filename,
    });
    const results = await AppDataSource.getRepository(QuotePdf).save(quotePdf);
    return res.send(results);

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return error;
  }
};

export async function getPDF(request, response) {
  const pdfPath = path.join(__dirname, '../../uploads/', request.params.filename);
  const pdf = fs.readFileSync(pdfPath);
  response.contentType('application/pdf');
  response.send(pdf);
}