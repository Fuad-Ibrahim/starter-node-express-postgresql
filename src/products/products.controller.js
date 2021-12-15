const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundaries");
const res = require("express/lib/response");

function read(req, res, next) {
  res.json({ data: { product_title: "some product title" } });
}

async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });
}

async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

function read(req, res) {
  const { product: data } = res.locals;
  res.json({ data });
}

async function listPriceSummary(req, res, next) {
  const data = await productsService.listPriceSummary();
  res.json({ data });
}

async function listOutOfStockCount(req, res, next) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() });
}
module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: asyncErrorBoundary(list),
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
};
