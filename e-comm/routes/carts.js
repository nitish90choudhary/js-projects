const express = require("express");
const cartsRepo = require("../data/carts");
const productsRepo = require("../data/products");
const router = express.Router();
const productsIndexTemplate = require("../views/products/index");
const cartTemplate = require("../views/cart/index");

//1 recive a post request to add product to cart
router.post("/cart/products/:productId/add", async (req, res) => {
  //New cart
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else cart = await cartsRepo.getOne(req.session.cartId);

  const elementPresence = cart.items.findIndex(
    (ele) => ele.id === req.params.productId
  );

  if (elementPresence >= 0) {
    console.log("Item alredy in the cart");
    cart.items[elementPresence].quantity++;
  } else {
    console.log("new Item adding in the cart");
    cart.items.push({ id: req.params.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, cart);
  res.redirect("/cart");
});

//2 recive a post request to delete product to cart
router.post("/cart/products/:itemId/delete", async (req, res) => {
  console.log(req.params.itemId);
  const cart = await cartsRepo.getOne(req.session.cartId);
  const items = cart.items.filter((item) => item.id !== req.params.itemId);
  await cartsRepo.update(cart.id, { items });
  console.log(items);
  res.redirect("/cart");
});

//3. Get request to show all the items added in cart
router.get("/cart", async (req, res) => {
  if (!req.session.cartId) res.redirect("/");
  const cart = await cartsRepo.getOne(req.session.cartId);
  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }
  res.send(cartTemplate({ items: cart.items }));
});

module.exports = router;
