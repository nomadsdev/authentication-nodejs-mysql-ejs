const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session')
const bodyParser = require('body-parser');
require('dotenv').config();

const { Register, Login, Logout } = require('./API/Authentication');
const { ChangePassword } = require('./API/changePassword');
const { AddImageSlder } = require('./API/IncreaseImageSlider');
const { renderIndex, renderLogin, renderRegister, Profile } = require('./Page/MainRouter');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    renderIndex(req, res);
});
app.get('/login', (req, res) => {
    renderLogin(req, res);
});
app.get('/register', (req, res) => {
    renderRegister(req, res);
});
app.get('/profile', (req, res) => {
    Profile(req, res);
});

app.post('/register', (req, res) => {
    Register(req, res);
});
app.post('/login', (req, res) => {
    Login(req, res);
});
app.get('/logout', (req, res) => {
    Logout(req, res);
});
app.post('/change-password', (req, res) => {
    ChangePassword(req, res);
});
app.post('/uploadimageslider', (req, res) => {
    AddImageSlder(req, res);
});
app.listen(PORT, () => {
    console.log(`Server is running`);
});