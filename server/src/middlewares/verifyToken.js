import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User, Token } from '../database/models';

const { JWT_SECRET } = process.env;

const verifyToken = (userType = []) => async (req, res, next) => {
  let user;
  if (!req.headers) {
    return res.status(401).json({ status: 401, message: 'Unauthorized access' });
  }
  const { authorization = false } = req.headers;
  if (!authorization) {
    return res.status(401).json({ status: 401, message: 'Unauthorized access' });
  }
  const token = authorization.slice(7);

  // Checks if the token exist in the database
  const foundToken = await Token.findOne({ where: { token }, attributes: ['token'] });
  if (!foundToken) {
    return res.status(401).json({ status: 401, message: 'Please login', token });
  }

  // Verify and decode the token
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({ status: 401, message: 'Unauthorized access' });
    }
    user = await User.findOne({ where: { id: decoded.id }, attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(401).json({ status: 401, message: 'Unauthorized access' });
    }
    const currentUser = user.get();
    req.body.currentUser = currentUser;
    if (userType.length === 0) return next();
    if (userType.indexOf(currentUser.userType) === -1) {
      return res.status(403).json({ status: 403, message: 'Not allowed' });
    }
    next();
  });
};

export default verifyToken;
