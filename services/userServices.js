import User from "../models/User.js";
import generateToken from "../middleware/jwtGenerate.js";
import bcrypt from "bcryptjs";
process.loadEnvFile();

export async function getUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting users: ${error.message}`);
  }
}

export async function createUser(userData) {
  const { name, email, password } = userData;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return `Existe un usuario con el ${email}`;
    }
    const dbUser = User.create({
      name: name,
      email: email,
      password: password,
    });
    return dbUser;
  } catch (error) {
    console.log(error);
    throw new Error(`Error al crear el usuario: ${error.message}`);
  }
}

export async function loginUser(user) {
  try {
    const { email, password } = user;
    const userInDB = await User.findOne({ email });
    if (!userInDB) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, userInDB.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    // if (password != userInDB.password) {
    //   throw new Error("Invalid password");
    // }
    const token = generateToken({ userInDB }); //email: email
    return token;
  } catch (error) {
    console.log(error);
    throw new Error(`Authentication failed: ${error.message}`);
  }
}

export async function getOne(user) {
  try {
    const { email } = user;
    const userInDB = await User.findOne({ email });
    if (!userInDB) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting user: ${error.message}`);
  }
}

export async function deleteUserById(_id) {
  try {
    const result = await User.findByIdAndDelete(_id);
    if (!result) {
      throw new Error("User not found");
    }
    return result;
  } catch (error) {
    throw new Error(`Error to delete user: ${error.message}`);
  }
}

export async function deleteAllUsers() {
  try {
    const result = await User.deleteMany();
    return result;
  } catch (error) {
    throw new Error(`Error to delete all users: ${error.message}`);
  }
}

// export async function updateUserById(_id, updates) {
//   try {
//     const user = await User.findById(_id).exec();
//     if (!user) {
//       throw new Error("User not found");
//     }

//     const { name, email, password } = updates;
//     user.name = name || user.name;
//     user.email = email || user.email;
//     user.password = password || user.password;

//     await user.save();
//     return user;
//   } catch (error) {
//     throw new Error(`Error updating user: ${error.message}`);
//   }
// }

// export async function updateUserById(_id, updates) {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(_id, updates, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedUser) {
//       throw new Error("User not found");
//     }

//     return updatedUser;
//   } catch (error) {
//     throw new Error(`Error updating user: ${error.message}`);
//   }
// }

export async function updateUserById(_id, updateData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}
