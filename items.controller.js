const db = require("./db");
const items = db.items;
const { Op } = require("sequelize");

// ADD NEW DATA
async function createItem(req, res) {
  if (!req.body.name || !req.body.status || !req.body.price) {
    return res.status(400).send({ message: "Undefined Data Provided" });
  }
  const itemObject = {
    name: req.body.name,
    status: req.body.status,
    price: req.body.price,
  };
  try {
    const data = await items.create(itemObject);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

// FIND ALL DATA
async function findAllItems(req, res) {
  try {
    const data = await items.findAll();
    // const data = await items.findAll({ limit: 1 });   // Limit Data
    // const data = await items.findAll({ offset: 1, limit: 2 });  // Skip and find laters (paginations)
    // const data = await items.findAll({ attributes: { include: [["name", "firstName"]] } });   // Including custom column
    // const data = await items.findAll({attributes:{exclude:['price']}});  // Excluding the custom column
    // const data = await items.findAll({where:{name:"TVF",status:"active"}});   // AND Query
    // const data = await items.findAll({ where: { [Op.or]: [{ name: "TVF" }, { name: "TV" }] } }); // OR Query
    // const data = await items.findAll({ where: { name: { [Op.or]: ["TVF", "TX"] } } }); // Ease OR Query
    // const data = await items.findAll({ where: { name:['TVF','TV'] } }); // In Query
    // const data = await items.findAll({ where: { name: { [Op.like]: "%F" } } }); // like...
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

// FIND DATA BY PRIMARY KEY
async function findItemByName(req, res) {
  try {
    const data = await items.findByPk(req.params.name);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

// UPDATE DATA
async function updateItem(req, res) {
  const updatedData = {
    name: req.body.name,
    status: req.body.status,
    price: req.body.price,
  };
  try {
    await items.update(updatedData, { where: { name: req.body.name } });
    // await items.increment({price: 5000}, { where: { name: 'Fib' } })
    res.send("Data Updated for " + req.body.name);
  } catch (error) {
    res.status(500).send(error);
  }
}

// DELETE DATA
async function deleteItem(req, res) {
  try {
    await items.destroy({ where: { name: req.params.name } });
    res.send("Data Deleted for " + req.params.name);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { createItem, findAllItems, findItemByName, updateItem, deleteItem };
