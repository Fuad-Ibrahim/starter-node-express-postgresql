const categoriesService = require("./categories.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundaries");

async function list(req, res, next) {
  try {
    const data = await categoriesService.list();
    res.json({ data });
  } catch {
    next(error);
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};
