import jwt from "jsonwebtoken";
process.loadEnvFile();

function generateToken(user) {
  try {
    const secret = process.env.SECRECT_KEY;
    const token = jwt.sign(user, secret, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.log(error);
    return "Error al crear el token";
  }
}
export default generateToken;
