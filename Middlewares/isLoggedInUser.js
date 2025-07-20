import jwt from "jsonwebtoken";
import userFinder from "../Utils/userFinder.js";

const logerAuthenticate = async (req, res, next) => {
  try {
    let token = req.cookies?.UserToken;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userFinder({
      key: "email",
      query: decoded.email,
      lean: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

export default logerAuthenticate;
