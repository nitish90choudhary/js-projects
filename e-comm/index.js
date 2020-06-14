const express = require('express');
const bodyParser = require('body-parser')
const authRouter = require('./routes/admin/auth')
const productRouter = require('./routes/admin/products')
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
app.use(productRouter);

//start listening to network traffic
app.listen(3000, () => {
    console.log('Listening..')
});