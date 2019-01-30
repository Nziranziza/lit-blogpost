import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../database/models';

const { JWT_SECRET } = process.env;

const verifyToken = (userType = []) => (req, res, next) => {
  if (!req.headers) {
    return res.status(401).json({ succes: false, message: 'Unauthorized access' });
  }
  const { authorization = false } = req.headers;
  if (!authorization) {
    return res.status(401).json({ succes: false, message: 'Unauthorized access' });
  }
  const token = authorization.slice(7);
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({ succes: false, message: 'Unauthorized access' });
    }
    const user = new User();
    await user.find({ where: { id: decoded.id } });
    if (!user.id) {
      return res.status(401).json({ succes: false, message: 'Unauthorized access' });
    }
    const currentUser = user.get();
    req.body.currentUser = currentUser;
    if (userType.length === 0) return next();
    if (userType.indexOf(currentUser.userType) === -1) {
      return res.status(403).json({ succes: false, message: 'Not allowed' });
    }
    next();
  });
};

export default verifyToken;
