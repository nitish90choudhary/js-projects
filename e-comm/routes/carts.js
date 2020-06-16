const express = require("express");
const cartsRepo = require("../data/carts");
const router = express.Router();
const productsIndexTemplate = require("../views/products/index");

//1 recive a post request to add product to cart
router.post("/cart/products/:productId/add", async (req, res) => {
  //New cart
  if (!req.session.cartId) {
    const items = [];
    items.push({ id: req.params.productId, quantity: 1 });
    const cart = await cartsRepo.create({ items });
    req.session.cartId = cart.id;
    return res.send("cart created");
  }

  console.log("session", req.session.cartId);
  const existingCart = await cartsRepo.getOne(req.session.cartId);

  //If product is already in cart then increment the quantity
  //else add it
  const elementPresence = existingCart.items.findIndex(
    (ele) => ele.id == req.params.productId
  );
  console.log("presence", elementPresence);

  if (elementPresence >= 0) {
    console.log("Item alredy in the cart");
    existingCart.items[elementPresence].quantity = existingCart.items[elementPresence].quantity  + 1;
    await cartsRepo.update(existingCart.id, existingCart);
  } else {
    console.log("new Item adding in the cart");
    existingCart.items.push({ id: req.params.productId, quantity: 1 });
    await cartsRepo.update(existingCart.id, existingCart);
  }

  // await cartsRepo.update(cart.id,{})
  console.log(existingCart);
});

//2 recive a post request to delete product to cart
router.get("/cart/products/:productId/delete", async (req, res) => {
  req.session = null;
  res.send("deleted");
});

//3. Get request to show all the items added in cart
router.get("/cart", async (req, res) => {
  res.send("cart displayed");
});

module.exports = router;
