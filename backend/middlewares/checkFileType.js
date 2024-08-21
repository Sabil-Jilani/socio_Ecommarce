const path = require("path");

module.exports = (file, cb) => {
  const fileType = /jpg|jpeg|png/;
  const extType = fileType.test(path.extname(file.originalname).toLowerCase());

  // const mimeType = fileType.test(file.mimeType.slice(5));
  if (extType) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  } else {
    cb("image only");
  }
};
