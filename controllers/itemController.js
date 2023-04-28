const categories = ["Makanan", "Alat Masak"];
const items = ["Bakso", "Spatula", "Wajan"];

exports.index = (req, res) => {
  res.render("index", {
    title: "My Inventory Home",
    data: {
      categories,
      items,
    },
  });
};

exports.item_list = (req, res, next) => {
  res.render("item_list", {
    title: "Item List",
    item_list: items,
  });
};
