const db = require('../db');

function AddImageSlder(req, res) {
    const imageUrl = req.body.imageUrl;
    const sql = `INSERT INTO image_slider (url) VALUES (?)`;
    db.query(sql, [imageUrl], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('เกิดข้อผิดพลาดในการเพิ่มรูปภาพ');
        } else {
            res.redirect('/');
        }
    });
}

// function deleteImageSlider(req, res) {
//     const id = req.params.id;
//     const sql = `DELETE FROM image_slider WHERE id = ?`;
//     db.query(sql, [id], (err, results) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('เกิดข้อผิดพลาดในการลบรูปภาพ');
//         } else {
//             res.redirect('/');
//         }
//     });
// }
// ใครจะเพิ่มลบรูปภาพก็เพิ่มนะ ขก

module.exports = { AddImageSlder };