const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  //   const token = req.header("Authorization");
  //   if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    // Send the bearer to the .NET backend to verify the token
    // const response = await fetch("http://localhost:5000/api/auth/verify", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ token }),
    // });
    // if (!response.ok) {
    //   return res.status(400).send("Invalid token.");
    // }

    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
