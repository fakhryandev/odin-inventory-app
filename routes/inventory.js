const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");

router.get("/", itemController.index);
router.get("/item", itemController.item_list);

router.get("/category", categoryController.category_list);
router.get("/category/create", categoryController.category_create_get);
router.post("/category/create", categoryController.category_create_post);
router.get("/category/:id", categoryController.category_detail);
router.get("/category/:id/update", categoryController.category_update_get);
router.post("/category/:id/update", categoryController.category_update_post);
router.get("/category/:id/delete", categoryController.category_delete_get);
router.post("/category/:id/delete", categoryController.category_delete_post);

module.exports = router;
