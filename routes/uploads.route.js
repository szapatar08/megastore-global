const express = require("express");
const multer = require("multer");
const {
  customers,
  suppliers,
  categories,
  products,
  orders,
  orders_products,
} = require("../controllers/uploads.controller");

const router = express.Router();
const upload = multer({ dest: "../uploads/" });

router.post("/upload/customers", upload.single("file"), customers);
router.post("/upload/suppliers", upload.single("file"), suppliers);
router.post("/upload/categories", upload.single("file"), categories);
router.post("/upload/products", upload.single("file"), products);
router.post("/upload/orders", upload.single("file"), orders);
router.post("/upload/orders_products", upload.single("file"), orders_products);

module.exports = router;
