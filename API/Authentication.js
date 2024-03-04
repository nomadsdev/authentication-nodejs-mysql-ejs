const db = require('../db');
const bcrypt = require('bcrypt');

async function Register(req, res) {
    const { username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (error, results) => {
            if (error) {
                console.error(error);
                res.render('register', { errorMessage: 'การลงทะเบียนไม่สำเร็จ กรุณาลองอีกครั้ง', loggedIn: req.session.loggedIn });
            } else {
                console.log('สมัคสมาชิกสำเร็จ!!');
                res.redirect('/login');
            }
        });
    } catch (error) {
        console.error(error);
        res.render('register', { errorMessage: 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง', loggedIn: req.session.loggedIn });
    }
}

async function Login(req, res) {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (results.length > 0) {
            const user = results[0];
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                req.session.loggedIn = true;
                req.session.username = results[0].username;
                req.session.email = results[0].email;
                res.redirect('/');
            } else {
                res.render('login', { errorMessage: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง', loggedIn: req.session.loggedIn });
            }
        } else {
            res.render('login', { errorMessage: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง', loggedIn: req.session.loggedIn });
        }
    });
}

function Logout(req, res) {
    req.session.destroy(() => {
        res.redirect('/');
    });
}

module.exports = { Register, Login, Logout };