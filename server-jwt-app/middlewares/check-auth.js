const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async(req, res, next) => {
    var token;
    try {
        token = req.header("token");

        if(!token) {
            return res.status(403).json("Not Authorized!1")
        }
        const decodedToken = jwt.verify(token, process.env.SECRET);

        req.user = decodedToken.user;
        next()
    } catch(err) {
        console.error(err.message);
        return res.status(403).json("Not Authorized!2");
    }
    
}