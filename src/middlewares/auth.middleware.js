import jwt from "jsonwebtoken";

export const authenticate =  (req, res, next) => {
    console.log("before try block of authenticate")
    try {
    const authHeader = req.headers["authorization"]; // lowercase key
    console.log("inside the authenticator .....")
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    // verify returns the decoded payload if valid
    const decoded =  jwt.verify(token, process.env.JWT_STUDENT_SECRET_KEY);

    req.user = decoded; // attach user payload to request
    console.log("user authenticated now moving to next .....")
    next();             // continue to controller
  } catch (err) {
    console.error("❌ JWT Error:", err.message);

    return res.status(403).json({
      error: "Invalid or expired token"
    });
  }
};
