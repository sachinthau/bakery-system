module.exports = function (app) {
  const ctrlBakeryItem = require("../controller/bakery_item.controller");
  
  // bakery item routes
  app.post("/api/bakery-item", ctrlBakeryItem.add);
  app.put("/api/bakery-item", ctrlBakeryItem.update);
  app.get("/api/bakery-items",  ctrlBakeryItem.getAll);
  app.delete("/api/bakery-item", ctrlBakeryItem.delete);

  // API tester ping -> pong
  app.get("/api/ping", (_, res) => res.send("pong"));
};
