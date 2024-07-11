// var jwt = require("jsonwebtoken");
// const JWT_SECRET = "yash";

// const fetchuser = (req, res, next) => {
//   // Get the user from the jwt token and add id to req object
//   const token = req.header("auth-token");
//   if (!token) {
//     return res
//       .status(401)
//       .send({ error: "Please authenticate using a valid token" });
//   }
//   try {
//     const data = jwt.verify(token, JWT_SECRET);
//     req.user = data.id; // Assuming `data` has an `id` property
//     next();
//   } catch (error) {
//     res.status(401).send({ error: "Please authenticate using a valid token" });
//   }
// };

// module.exports = fetchuser;

const jwt = require("jsonwebtoken");
const JWT_SECRET = "yash";

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add user object to req object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user; // Assuming `decoded` has a `user` property
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = fetchuser;
