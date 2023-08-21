const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECKEY, (err, decoded) => {
      if (err) return res.json({ msg: "token expire" });
      else if (decoded) {
        req.body.userID = decoded.userID;
      }
      next();
    });
  } else {
    res.json({ msg: "no token" });
  }
};

module.exports = { authMiddleware };
