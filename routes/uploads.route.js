const express = require("express");
const multer = require("multer");
const {
  customers,
  suppliers,
  categories,
} = require("../controllers/uploads.controller");

const router = express.Router();
const upload = multer({ dest: "../uploads/" });

router.post("/upload/customers", upload.single("file"), customers);
router.post("/upload/suppliers", upload.single("file"), suppliers);
router.post("/upload/categories", upload.single("file"), categories);

module.exports = router;
