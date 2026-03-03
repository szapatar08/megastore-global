const express = require("express");
const {
  get_all_orders,
  get_one_user,
  make_order,
  delete_order,
  update_order,
} = require("../controllers/orders.controller");

const router = express.Router();

router.post("/", make_order);

router.delete("/:id", delete_order);

router.get("/", get_all_orders);
router.get("/:id", get_one_user);

router.put("/:order_id/:column/:value", update_order);

module.exports = router;
