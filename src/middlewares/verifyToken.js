import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User, Token } from '../database/models';

const { JWT_SECRET } = process.env;

/**
 * @author Olivier
 * @param {Object} obj - verifyToken params
 * @param {Object} obj.userType - An array of authorized user types
 * @param {Object} obj.openAccess - Allows a route be access with and without token
 */
const verifyToken = ({ userType = [], openAccess = false } = {}) => async (req, res, next) => {
  let user;
  const { authorization = false } = req.headers;

  if (!authorization || authorization === 'undefined') {
    if (openAccess) {
      return next();
    }
    return res.status(401).json({ status: 401, message: 'Unauthorized access' });
  }
  const token = authorization.slice(7);

  // Checks if the token exist in the database
  const foundToken = await Token.findOne({ where: { token }, attributes: ['token'] });
  if (!foundToken) {
    return res.status(401).json({ status: 401, message: 'Please login' });
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
