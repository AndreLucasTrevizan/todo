import {
  Request,
  Response,
} from 'express';
import jwt from 'jsonwebtoken';
import { User } from './models/Auth';

const {
  SECRET
} = process.env;

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      email, password
    } = req.body;

    const exists_user = await User.findOne({ email });

    if (exists_user && exists_user.comparePassword(password)) {
      const token = jwt.sign(exists_user.serialize(), String(SECRET), { expiresIn: '1h' });

      return res.json({...exists_user.serialize(), token});
    }

    return res.json(404).json({ message: 'Email ou senha inválidos'});
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const exists_user = await User.findOne({ email: req.body.email });

    if (!exists_user) {
      const user = await User.create(req.body);

      return res.status(201).json({ _id: user._id });
    }

    return res.status(400).json({ message: 'Este email já está em uso. '});
  } catch (error) {
    return res.status(500).json({ error });
  }
};

