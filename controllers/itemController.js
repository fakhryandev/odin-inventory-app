const Item = require("../models/item");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");

exports.index = async (req, res) => {
  try {
    const itemCount = await Item.countDocuments();
    const categoryCount = await Category.countDocuments();

    const results = {
      itemCount,
      categoryCount,
    };

    res.render("index", {
      title: "My Inventory Home",
      data: results,
    });
  } catch (error) {
    res.render("index", {
      title: "My Inventory Home",
      error,
    });
  }
};

exports.item_list = async (req, res, next) => {
  const itemList = await Item.find().sort({ name: 1 }).populate("category");

  res.render("item_list", {
    title: "Item List",
    itemList,
  });
};

exports.item_create_get = async (req, res) => {
  const categories = await Category.find();

  res.render("item_form", {
    title: "Create Item",
    errors: false,
    item: undefined,
    categories,
  });
};

exports.item_detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id).populate("category");

    res.render("item_detail", {
      title: "Item Detail",
      item,
    });
  } catch (error) {
    next(error);
  }
};

exports.item_create_post = [
  body("name", "Item name required").isLength({ min: 1 }).escape(),
  body("description", "Item description required")
    .isLength({ min: 1 })
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);

    const { name, description, category, stock, price } = req.body;

    if (!errors.isEmpty()) {
      return res.render("item_form", {
        title: "Create Item",
      });
    }

    try {
      const newItem = new Item({
        name,
        description,
        category,
        stock,
        price,
      });

      await newItem.save();

      res.redirect("/inventory/item");
    } catch (error) {
      next(error);
    }
  },
];
