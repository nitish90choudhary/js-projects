const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/admin/auth');
const adminProductRouter = require('./routes/admin/products');
const productRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const cookieSession = require('cookie-session');

const app = express();

//use middleware for all router handler
app.use(bodyParser.urlencoded({
    extended: true
}));

//using cookie session
app.use(cookieSession({
    keys: ['aosjfspoufwm3lw697ipidsdflssdfs']
}));

//exposing public directory
app.use(express.static('public'));

app.use(authRouter);
app.use(adminProductRouter);
app.use(productRouter);
app.use(cartsRouter);

//start listening to network traffic
app.listen(3000, () => {
    console.log('Listening..')
});