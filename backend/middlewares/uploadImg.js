const multer = require("multer");

const checkFileType = require("./checkFileType");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    checkFileType(file, cb);
  },
});
module.exports = multer({ storage: storage });
