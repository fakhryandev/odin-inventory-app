const categories = ["Makanan", "Alat Masak"];

exports.category_list = (req, res, next) => {
  res.render("category_list", {
    title: "Category List",
    category_list: categories,
  });
};
