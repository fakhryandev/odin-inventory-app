const Item = require("../models/item");
const Category = require("../models/category");

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

exports.item_list = (req, res, next) => {
  res.render("item_list", {
    title: "Item List",
    item_list: items,
  });
};
