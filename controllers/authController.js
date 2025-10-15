import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { email, password, nombre, usuario, distrito } = req.body;

    if (!email || !password || !nombre || !usuario || !distrito) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword, nombre, usuario, distrito });

    res.status(201).json({ message: "Usuario registrado", user });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error });
  }
};

export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const user = await User.findOne({ where: { usuario } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ message: "Error en el login", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { nombre, distrito } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (nombre) user.nombre = nombre;
    if (distrito) user.distrito = distrito;

    await user.save();

    res.json({ message: "Usuario actualizado correctamente", user });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error del servidor", error });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.user; 
    const user = await User.findByPk(id, {
      attributes: ["id", "nombre", "usuario", "distrito", "email"],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error al obtener perfil de usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
