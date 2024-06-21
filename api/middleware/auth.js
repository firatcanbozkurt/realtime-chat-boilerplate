const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  

  try {
    // Your auth comes here!
  }

    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
