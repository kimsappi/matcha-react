const mysql = require('mysql');
const pool = require('../../modules/dbConnect');


const get = (req, res, next) => {
	if (!req.user)
        res.json(null);
    
    console.log("asddjoo");
    const query = "SELECT * FROM "




    // return(res.json("asdd"))

}


module.exports = {
	get
};
