const productsRepo = require("../../data/products");
const express = require("express");
const newProductTemplate = require("../../views/admin/products/new");
const editProductTemplate = require("../../views/admin/products/edit");
const productListTemplate = require("../../views/admin/products/index");
const { validateProductName, validatePrice } = require("./validator");
const { handleErrors, requireAuth } = require("./middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/admin/products", requireAuth, async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productListTemplate({ products }));
});

router.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(newProductTemplate({}));
});

router.post(
  "/admin/products/new",
  requireAuth,
  upload.single("image"),
  [validateProductName, validatePrice],
  handleErrors(newProductTemplate),
  async (req, res) => {
    const image = req.file.buffer.toString("base64");
    const { productName, price } = req.body;
    await productsRepo.create({
      productName,
      price,
      image,
    });
    res.redirect("/admin/products");
  }
);

router.get("/admin/products/:id/edit", requireAuth, async (req, res) => {
  console.log(req.params.id);
  const product = await productsRepo.getOne(req.params.id);
  if (!product) res.send("product not found!!");

  res.send(editProductTemplate({ product }));
});

router.post(
  "/admin/products/:id/edit",
  requireAuth,
  upload.single("image"),
  [validateProductName, validatePrice],
  handleErrors(editProductTemplate, async (req) => {
    const product = await productsRepo.getOne(req.params.id);
    return { product };
  }),
  async (req, res) => {
    const changes = req.body;
    if (req.file) {
      changes.image = req.file.buffer.toString("base64");
    }
    try {
      await productsRepo.update(req.params.id, changes);
    } catch (err) {
      return res.send("could find item");
    }
    res.redirect("/admin/products");
  }
);

router.post("/admin/products/:id/delete", requireAuth, async (req, res) => {
  await productsRepo.delete(req.params.id);
  res.redirect("/admin/products");
});

module.exports = router;
