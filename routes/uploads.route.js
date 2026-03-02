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

router.post("/customers", upload.single("file"), customers);
router.post("/suppliers", upload.single("file"), suppliers);
router.post("/categories", upload.single("file"), categories);
router.post("/products", upload.single("file"), products);
router.post("/orders", upload.single("file"), orders);
router.post("/orders_products", upload.single("file"), orders_products);

module.exports = router;
