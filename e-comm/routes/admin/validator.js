const { check } = require("express-validator");
const userRepo = require("../../data/users");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (email) => {
      const existingUser = await userRepo.getOneBy({
        email,
      });
      if (existingUser) throw new Error(`This ${email} is arleady in use!`);
    }),

  requirePwd: check("pwd")
    .trim()
    .isLength({
      min: 4,
      max: 20,
    })
    .withMessage("Must be between 4 and 20 characters"),

  requireCnfPwd: check("cnfPwd")
    .trim()
    .isLength({
      min: 4,
      max: 20,
    })
    .withMessage("Must be between 4 and 20 characters")
    .custom(async (cnfPwd, { req }) => {
      if (cnfPwd !== req.body.pwd)
        throw new Error("Password and confirmation password should match!");
    }),

  validateEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (email) => {
      const user = await userRepo.getOneBy({
        email,
      });
      if (!user) throw new Error("Email not found");
    }),

  validatePwd: check("pwd")
    .trim()
    .custom(async (pwd, { req }) => {
      const user = await userRepo.getOneBy({
        email: req.body.email,
      });
      if (!user) throw new Error("Invalid password");
      const validUser = await userRepo.comparePassword(user.pwd, pwd);
      if (!validUser) throw new Error("Password is incorrect");
    }),
  validateProductName: check("productName")
    .trim()
    .isLength({
      min: 5,
      max: 20,
    })
    .withMessage("Name be between 5 and 20 characters"),
  validatePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({
      min: 1,
    })
    .withMessage("Price must be a number greater than 1.0 with(out) decimals"),
};
