import multer from "multer";
import fs from"fs"
import path from 'path';
import { fileURLToPath } from 'url'; 
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    cb(null, __dirname + "/../resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-Dev-${file.originalname}`);
  },
});

export const fileCheck = multer({ storage: storage, fileFilter: imageFilter });

export const deleteFile = (filePath) => {
  fs.unlink(filePath, () => {
    console.log("file deleted");
  });
};