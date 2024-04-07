const jwt = require("jsonwebtoken");
require('dotenv').config();
const mySecret = process.env.MY_SECRET;

function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  const token = authToken.split(' ')[1];
  jwt.verify(token, mySecret, (err, user) => {
    if (err) {
        console.log(err)
      return res.status(401).send("Unauthorized: Invalid token");
    }
    req.user = user;
    next();
  });
}

module.exports = verifyToken;