const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");

router.get("/", itemController.index);
router.get("/item", itemController.item_list);

router.get("/category", categoryController.category_list);

module.exports = router;
