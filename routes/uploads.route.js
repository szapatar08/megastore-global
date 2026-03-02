const express = require("express");
const multer = require("multer");
const { customers } = require("../controllers/uploads.controller");

const router = express.Router();
const upload = multer({ dest: "../uploads/" });

router.post("/upload/customers", upload.single("file"), customers);

module.exports = router;
