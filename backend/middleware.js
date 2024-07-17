
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(typeof authHeader);
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(403).send({
            message: "Incorrect Token"
        })
    }

    const token = authHeader.split(" ")[1];
    console.log("-----------------------------------------------------> ", token);

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        console.log("------------------------ >",decoded);
        if(decoded.userId) {
            req.userId = decoded.userId;
            next();
        }
    }
    catch(err) {
        res.status(403).send({
            message: "Unauthorized"
        })
    }
}
module.exports = {
    authMiddleware
};