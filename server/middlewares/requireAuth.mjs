import "dotenv/config";
import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  try {
    const bearer = req.headers["authorization"];
    if (!bearer) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = bearer.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default requireAuth;