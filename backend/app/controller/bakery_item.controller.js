const db = require("../config/db.config.js");
const util = require("../util/utility.js");

const BakeryItem = db.bakery_item;

const { ServerSuccess, ServerError } = require("../constants/app.js");

// Add bakery item
exports.add = (req, res) => {
  console.log("Processing func -> Add bakery item...");

  BakeryItem.create({
    uuid: util.uuidGenerator(),
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice
  }).then(_ => {
    res.send(util.generateResponse(ServerSuccess.ADD_SUCCESS));
  }).catch(() => {
    res.status(500).send(util.generateResponse(ServerError.COMMON_ERROR));
  });
};

// Update bakery item
exports.update = (req, res) => {
  console.log("Processing func -> Update bakery item...");

  BakeryItem.update(
    {
      itemName: req.body.itemName,
      itemPrice: req.body.itemPrice
    },
    { where: { uuid: req.body.uuid } }
  ).then((_) => {
    res.send(util.generateResponse(ServerSuccess.UPDATE_SUCCESS));
  }).catch(() => {
    res.status(500).send(util.generateResponse(ServerError.COMMON_ERROR));
  });
};

// Delete bakery item
exports.delete = (req, res) => {
  console.log("Processing func -> Delete bakery item...");

  BakeryItem.destroy({
    where: { uuid: req.body.uuid }
  }).then(() => {
    res.send(util.generateResponse(ServerSuccess.DELETE_SUCCESS));
  }).catch((err) => {
    console.log(err);
    res.status(500).send(util.generateResponse(ServerError.COMMON_ERROR));
  });
};

// Get all bakery items
exports.getAll = (_, res) => {
  console.log("Processing func -> Get all bakery items...");

  BakeryItem.findAll({
    attributes: ['uuid', 'itemName', 'itemPrice']
  })
    .then((items) => {
      res.send(items);
    })
    .catch(_ => {
      res.status(500).send(util.generateResponse(ServerError.COMMON_ERROR));
    });
};
