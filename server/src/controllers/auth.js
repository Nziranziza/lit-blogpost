import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { User, Token } from '../database/models';

const { JWT_SECRET } = process.env;

export default class Auth {
  static async signup(req, res) {
    let user;
    let token;
    const { body } = req;
    try {
      user = await User.find({ where: { email: body.email } });
      if (user) {
        return res.json({ status: 401, message: `${body.email} account already exist` });
      }
      user = await User.create(body);

      token = jwt.sign({ id: user.id, userType: user.userType }, JWT_SECRET);
      await user.createToken({ token });
    } catch (error) {
      return res.json({ status: 401, message: 'Please try again' });
    }

    return res.json({
      status: 201,
      message: 'Account created sucessfully',
      token,
      data: user.get()
    });
  }
}
