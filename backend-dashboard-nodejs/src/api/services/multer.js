const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //const { id } = req.query;
    const path = `./images-users/`;
    fs.mkdirSync(path, { recursive: true });
    return cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 10000000000,
  },
  fileFilter(req, file, cb) {
    if (
      !file.originalname.match(/\.(jfif|jpg|png|jpeg|gif|PNG|JPG|JFIF|webp)$/)
    ) {
      return cb(new Error("File must be Image"));
    }
    cb(undefined, true);
  },
});

module.exports = { uploadImage };
