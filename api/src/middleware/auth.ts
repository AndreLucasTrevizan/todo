import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SerializedUser } from '../types/auth';

const {
  SECRET
} = process.env;

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const has_authorization = req.headers['authorization'];

  if (has_authorization) {
    const token = has_authorization.split(' ')[1];
    jwt.verify(token, String(SECRET), (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Não autorizado' });

      req.user = decoded as SerializedUser;

      next();
    });
    return;
  }

  return res.status(401).json({ message: 'Não autorizado' });
};
