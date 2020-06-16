const userRepo = require("../../data/users");
const express = require("express");
const signUpTemplate = require("../../views/admin/auth/signup");
const signInTemplate = require("../../views/admin/auth/signin");
const { handleErrors } = require("../admin/middleware");

const router = express.Router();

const {
  requireEmail,
  requirePwd,
  requireCnfPwd,
  validateEmail,
  validatePwd,
} = require("./validator");

router.get("/signup", (req, res) => {
  res.send(
    signUpTemplate({
      req,
    })
  );
});

router.post(
  "/signup",
  [requireEmail, requirePwd, requireCnfPwd],
  handleErrors(signUpTemplate),
  async (req, res) => {
    const { email, pwd } = req.body;
    const user = await userRepo.create({
      email,
      pwd,
    });
    req.session.userId = user.id;
    //res.send("Account Created !!");
    res.redirect("/admin/products");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send(`You are logged out!`);
});

router.get("/signin", (req, res) => {
  res.send(signInTemplate({}));
});

router.post(
  "/signin",
  [validateEmail, validatePwd],
  handleErrors(signInTemplate),
  async (req, res) => {
    const user = await userRepo.getOneBy({
      email: req.body.email,
    });

    req.session.userId = user.id;
    //res.send(`You are Signed in!`);
    res.redirect("/admin/products");
  }
);

module.exports = router;
