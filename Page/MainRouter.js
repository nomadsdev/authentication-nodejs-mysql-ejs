const db = require('../db');

function renderIndex(req, res) {
    const sqlImages = `SELECT * FROM image_slider`;
    db.query(sqlImages, (err, ImageSliderResults) => {
        res.render('index', { title: 'หน้าแรก', loggedIn: req.session.loggedIn, images: ImageSliderResults });
    })
}

function renderLogin(req, res) {
    res.render('login', { loggedIn: req.session.loggedIn, errorMessage: '' });
}

function renderRegister(req, res) {
    res.render('register', { loggedIn: req.session.loggedIn, errorMessage: '' });
}

function Profile(req, res) {
    if (req.session.loggedIn) {
        res.render('profile', { loggedIn: true, username: req.session.username, email: req.session.email, errorChange: '' });
    } else {
        res.redirect('/login');
    }
}

module.exports = { renderIndex, renderLogin, renderRegister, Profile };