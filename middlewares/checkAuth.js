require('dotenv').config()
const JWT = require("jsonwebtoken")
const VALIDATION_TOKEN = process.env.VALIDATION_TOKEN

module.exports = async (req, res, next) => {

    const token = req.header("x-auth-token")

    if (!token) {
        return res.status(404).json({ msg: "Unable to Auth" })
    }

    try {
        let user = await JWT.verify(token, VALIDATION_TOKEN);
        req.user = user.username;
        next()
    } catch (err) {
        return res.status(404).json({ msg: "Unable to Auth" })
    }

}