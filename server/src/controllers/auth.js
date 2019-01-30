import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, Token } from '../database/models';
import { logger } from '../helpers';

const { JWT_SECRET } = process.env;

export default class Auth {
  static async signup(req, res) {
    let user;
    let token;
    const { body } = req;
    try {
      user = await User.findOne({ where: { email: body.email } });
      if (user) {
        return res
          .status(401)
          .json({ status: 401, message: `${body.email} account already exist` });
      }
      const password = await bcrypt.hash(body.password, 10);
      user = await User.create({ ...body, password });

      token = jwt.sign({ id: user.id, userType: user.userType }, JWT_SECRET);
      await user.createToken({ token });
    } catch (error) {
      logger.log('Could not save the user', error);
      return res.status(401).json({ status: 401, message: 'Please try again' });
    }
    const { password, ...userData } = user.get();
    return res.status(201).json({
      status: 201,
      message: 'Account created sucessfully',
      token,
      data: userData
    });
  }
}
