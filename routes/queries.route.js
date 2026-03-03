const express = require("express");
const {
  suppliers_analisis,
  client_analisis,
  best_products_category,
} = require("../controllers/queries.controller");

const router = express.Router();

router.get("/suppliers_analisis", suppliers_analisis);

router.post("/client_analisis", client_analisis);
router.post("/best_products_category", best_products_category);

module.exports = router;
