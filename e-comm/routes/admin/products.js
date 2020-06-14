const productsRepo = require("../../data/products");
const express = require("express");
const newProductTemplate = require("../../views/admin/products/new");
const { validationResult } = require("express-validator");
const { validateProductName, validatePrice } = require("./validator");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/admin/products", (req, res) => {
  res.send("products");
});

router.get("/admin/products/new", (req, res) => {
  res.send(newProductTemplate({}));
});

router.post(
  "/admin/products/new",
  upload.single("image"),
  [validateProductName, validatePrice],
  async (req, res) => {
    // res.send("POST new products");
    const errors = validationResult(req);
    if (!errors.isEmpty())
      res.send(
        newProductTemplate({
          errors,
        })
      );
    const image = req.file.buffer.toString("base64");
    const { productName, price } = req.body;
    await productsRepo.create({
      productName,
      price,
      image,
    });
    //productsRepo.writeAll(product)
    res.send("Product Created !!");
  }
);

module.exports = router;
