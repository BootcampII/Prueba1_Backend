import {
  createUser,
  getUsers,
  loginUser,
  getOne,
  deleteUserById,
  deleteAllUsers,
  updateUserById,
} from "../services/userServices.js";

export async function getAll(req, res) {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export async function create(req, res) {
  try {
    const userData = req.body;
    const { user, token } = await createUser(userData);
    return res.status(201).json({ message: "user create successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    //const user = req.body;
    const token = await loginUser({ email, password });
    res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
}

export async function getOneUser(req, res) {
  try {
    const user = req.body;
    const userInDB = await getOne(user);
    res.status(200).json({
      message: "User found",
      user: userInDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const deletedUser = await deleteUserById(userId);
    res.status(200).json({
      message: "User deleted",
      user: deletedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export async function deleteUsers(req, res) {
  try {
    const result = await deleteAllUsers();
    res.status(200).json({
      message: "All users deleted",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await updateUserById(userId, updateData);
    res.status(200).json({
      message: "User updated",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export async function protectedRoute(req, res) {
  try {
    const user = req.user;
    res.status(200).json({
      response: `Estás autenticado correctamente con el email: ${user.email}`,
    });
  } catch (error) {
    res.status(500).json({ message: `Ocurrio un error: ${error.message}` });
  }
}

// export async function updateUser(req, res) {
//   try {
//     console.log("req.auth:", req.auth);
//     const userId = req.auth._id;
//     const updates = req.body;

//     const updatedUser = await updateUserById(userId, updates);

//     return res.status(200).json(updatedUser); // Respuesta con el usuario actualizado
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: error.message });
//   }
// }

// export async function updateUser(req, res) {
//   try {
//     const userId = req._id;
//     const updateData = req.body;
//     const updatedUser = await updateUserById(userId, updateData);
//     res.status(200).json({
//       message: "User updated",
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// }
