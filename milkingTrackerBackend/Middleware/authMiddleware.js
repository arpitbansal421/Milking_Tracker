const jwt = require("jsonwebtoken");
const User = require("../Database/authSchema");

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_KEY';

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next(); //  IMPORTANT
    }

    return res.status(401).json({ message: "No token" });

  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = protect;