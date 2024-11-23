import jwt from "jsonwebtoken";
process.loadEnvFile();

function generateToken(user) {
  try {
    const secret = process.env.SECRECT_KEY;
    const token = jwt.sign({ id: user._id, email: user.email }, secret, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.log(error);
    return "Error al crear el token";
  }
}
export default generateToken;
