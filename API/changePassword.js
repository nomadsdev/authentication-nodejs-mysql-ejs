const db = require('../db');
const bcrypt = require('bcrypt');

function ChangePassword(req, res) {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { username } = req.session;

    if (!oldPassword || !newPassword || !confirmPassword) {
        return res.render('profile', { loggedIn: true, username: req.session.username, email: req.session.email, errorChange: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' })
    }
    if (newPassword !== confirmPassword) {
        return res.render('profile', { loggedIn: true, username: req.session.username, email: req.session.email, errorChange: 'รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน' })
    }
    db.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.error(error);
            return res.render('profile', { loggedIn: true, username: req.session.username, email: req.session.email, errorChange: 'เกิดข้อผิดพลาดขณะเปลี่ยนรหัสผ่าน' })
        }

        const user = results[0];
        const validPassword = await bcrypt.compare(oldPassword, user.password);

        if (!validPassword) {
            return res.render('profile', { loggedIn: true, username: req.session.username, email: req.session.email, errorChange: 'รหัสผ่านเก่าไม่ถูกต้อง' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        db.query('UPDATE users SET password = ? WHERE username = ?', [hashedNewPassword, username], (error, results) => {
            if (error) {
                console.error(error);
                return res.render('profile', { loggedIn: true, username: req.session.username, email: req.session.email, errorChange: 'เกิดข้อผิดพลาดขณะเปลี่ยนรหัสผ่าน' })
            }
            req.session.destroy(() => {
                res.redirect('/');
            });
        });
    });
}

module.exports = { ChangePassword };