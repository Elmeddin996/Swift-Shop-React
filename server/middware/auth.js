const jwt = require("jsonwebtoken");
const { ESecretkey } = require("../secretKey");

module.exports = function (req, res , next){
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401)
    }

    try {
        const decodedToken = jwt.verify(token, ESecretkey.key)
        req.user = decodedToken; 
        next();
    } catch (ex) {
        res.status(400)
    }

}