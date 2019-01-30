import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../database/models';
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
      await user.createToken({ token }); // Insert a new token from user's model
    } catch (error) {
      logger.log('Could not save the user', error);
      return res.status(401).json({ status: 401, message: 'Please try again' });
    }
    const { password, ...userData } = user.get(); // Get user's data without the password
    return res.status(201).json({
      status: 201,
      message: 'Account created sucessfully',
      token,
      data: userData
    });
  }

  static async login(req, res) {
    let user;
    const { body } = req;
    try {
      user = await User.findOne({ where: { email: body.email } });

      if (!user) {
        return res.status(404).json({ status: 404, message: 'User not found' });
      }
      const password = await bcrypt.compare(body.password, user.get().password);

      if (!password) {
        return res.status(404).json({ status: 404, message: "Email and password don't match" });
      }
    } catch (error) {
      return res.status(401).json({ status: 401, message: 'Please try again' });
    }
    const { ...userData } = user.get();
    return res.status(200).json({
      status: 200,
      message: 'User logged successfully',
      data: userData
    });
  }
}
