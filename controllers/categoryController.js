const { body, validationResult } = require("express-validator");

const categories = [
  {
    id: 1,
    name: "Makanan",
    description: "Kumpulan makanan dengan gizi tinggi",
  },
  {
    id: 2,
    name: "Alat Masak",
    description: "Kumpulan alat masak dengan kualitas terbaik",
  },
];

const items = [
  {
    name: "Bakso",
    description: "Cita rasa bakso malang dengan daging sapi pilihan",
    category: 1,
    price: 20,
    stock: 5,
  },
  {
    name: "Wajan",
    description: "Berbahan stainless steel kelas eropa",
    category: 2,
    price: 30,
    stock: 10,
  },
];

exports.category_list = (req, res, next) => {
  res.render("category_list", {
    title: "Category List",
    category_list: categories,
  });
};

exports.category_detail = (req, res) => {
  const id = req.params.id;
  const category = categories.find((x) => x.id == id);
  const itemByCategory = items.filter((x) => x.category == id);

  res.render("category_detail", {
    title: "Category Detail",
    category,
    category_item: itemByCategory,
  });
};

exports.category_create_get = (req, res) => {
  res.render("category_form", {
    title: "Create Category",
  });
};

exports.category_create_post = [
  body("name", "Category name required").isLength({ min: 1 }).escape(),
  body("description", "Category description required")
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const name = req.body.name;
    const description = req.body.description;

    console.log(name, description);
    console.log(errors);

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        errors: errors.array(),
      });
    } else {
      categories.push({
        id: categories.length + 1,
        name,
        description,
      });
      console.log(categories);
      res.redirect("/inventory/category");
    }
  },
];
