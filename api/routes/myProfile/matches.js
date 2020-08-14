const mysql = require('mysql');
const pool = require('../../modules/dbConnect');


const get = (req, res, next) => {
	if (!req.user)
        res.json(null);

    var userId = req.user.id;
    
    const query = `SELECT users.id, users.username, users.online, users.filename
     FROM user_and_main_photo AS users INNER JOIN likes ON users.id=likes.likee 
     WHERE likes.is_match=1 AND likes.liker=?;`;

    const prepareSql = mysql.format(query, [userId]);

    pool.query(prepareSql, (error, results) => {
        if (error)
            return res.json("query returned error");
        else
        {
            return res.json(results);
        }
    });
}


module.exports = {
	get
};
