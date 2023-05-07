const { body, validationResult } = require("express-validator");
const Category = require("../models/category");
const Item = require("../models/item");

exports.category_list = async (req, res, next) => {
  try {
    const categories = await Category.find().sort([["name", "ascending"]]);

    res.render("category_list", {
      title: "Category List",
      category_list: categories,
    });
  } catch (error) {
    next(error);
  }
};

exports.category_detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    const itemByCategory = await Item.find({ category: id });

    res.render("category_detail", {
      title: "Category Detail",
      category,
      category_item: itemByCategory,
    });
  } catch (error) {
    next(error);
  }
};

exports.category_create_get = (req, res) => {
  res.render("category_form", {
    title: "Create Category",
    errors: false,
    category: undefined,
  });
};

exports.category_create_post = [
  body("name", "Category name required").isLength({ min: 1 }).escape(),
  body("description", "Category description required")
    .isLength({ min: 1 })
    .escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const name = req.body.name;
      const description = req.body.description;

      if (!errors.isEmpty()) {
        res.render("category_form", {
          title: "Create Category",
          errors: errors.array(),
          category: undefined,
        });
      } else {
        const foundCategory = await Category.findOne({ name });

        if (foundCategory) {
          res.redirect(foundCategory.url);
        } else {
          const newCategory = new Category({
            name,
            description,
          });

          await newCategory.save();

          res.redirect("/inventory/category");
        }
      }
    } catch (error) {
      next(error);
    }
  },
];

exports.category_update_get = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);

    res.render("category_form", {
      category,
      title: "Update Category",
      errors: false,
    });
  } catch (error) {
    next(error);
  }
};

exports.category_update_post = [
  body("name", "Category name required").isLength({ min: 1 }).escape(),
  body("description", "Category description required")
    .isLength({ min: 1 })
    .escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const name = req.body.name;
      const description = req.body.description;

      if (!errors.isEmpty()) {
        return res.render("category_form", {
          title: "Create Category",
          errors: errors.array(),
          category: {
            name,
            description,
          },
        });
      }

      const id = req.params.id;

      const category = new Category({
        _id: id,
        name,
        description,
      });

      const theCategory = await Category.findByIdAndUpdate(id, category);

      res.redirect(theCategory.url);
    } catch (error) {
      next(error);
    }
  },
];

exports.category_delete_get = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    const categoryItems = await Item.find({ category: id });

    if (!category) {
      res.redirect("/inventory/category");
    }

    res.render("category_delete", {
      title: "Delete Category",
      category,
      categoryItems,
    });
  } catch (error) {
    next(error);
  }
};

exports.category_delete_post = async (req, res, next) => {
  try {
    const id = req.body.categoryid;

    const category = await Category.findById(id);
    const categoryItems = await Item.find({ category: id });

    if (categoryItems.length > 0) {
      return res.render("genre_delete", {
        title: "Delete Category",
        category,
        categoryItems,
      });
    }

    await Category.findByIdAndRemove(id);

    res.redirect("/inventory/category");
  } catch (error) {
    next(error);
  }
};
