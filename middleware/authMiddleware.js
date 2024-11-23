import jwt from "jsonwebtoken";
process.loadEnvFile();

const secret = process.env.SECRECT_KEY;

export function authToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res
      .status(500)
      .json({
        message:
          "Tienes que enviar el token para realizar la petición (a través del header)",
      });
  }
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      res.status(403).json({ message: "No autorizado" });
    }
    req.user = user;
    next();
  });
}
//   try {
//     const decoded = jwt.verify(token, process.env.SECRECT_KEY);
//     console.log("User ID from token:", decoded);
//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
