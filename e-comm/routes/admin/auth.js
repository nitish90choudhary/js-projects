const userRepo = require('../../data/users');
const express = require('express');
const signUpTemplate = require('../../views/admin/auth/signup');
const signInTemplate = require('../../views/admin/auth/signin');

const router = express.Router();

const {
    requireEmail,
    requirePwd,
    requireCnfPwd,
    validateEmail,
    validatePwd
} = require('./validator');

const {check,
    validationResult
} = require('express-validator');

router.get('/signup', (req, res) => {
    res.send(signUpTemplate({
        req
    }));
});

router.post('/signup', [requireEmail, requirePwd, requireCnfPwd], async (req, res) => {
    //console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(signUpTemplate({
            req,
            errors
        }));
    }
    const { email,pwd } = req.body;

    const user = await userRepo.create({
        email,
        pwd
    });
    req.session.userId = user.id;
    res.send('Account Created !!');

});

router.get('/signout', (req, res) => {
    req.session = null;
    res.send(`You are logged out!`)
});

router.get('/signin', (req, res) => {
    res.send(signInTemplate({}));
});

router.post('/signin', [validateEmail,validatePwd], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(signInTemplate({errors}));
    }
    const user = await userRepo.getOneBy({
        email: req.body.email
    });

    req.session.userId = user.id;
    res.send(`You are Signed in!`)

});

module.exports = router;