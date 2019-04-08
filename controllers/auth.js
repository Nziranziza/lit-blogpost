import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../database/models';

const { JWT_SECRET } = process.env;

export default class Auth {
  /**
   * @author Olivier
   */
  static async signup(req, res) {
    let user;
    const { body } = req;
    user = await User.findOne({ where: { email: body.email } });
    if (user) {
      return res.status(409).json({ status: 409, message: `${body.email} account already exist` });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    user = await User.create({ ...body, password: hashedPassword });

    const token = jwt.sign({ id: user.id, userType: user.userType }, JWT_SECRET);
    await user.createToken({ token }); // Insert a new token from user's model
    const { password, ...userData } = user.get(); // Get user's data without the password
    return res.status(201).json({
      status: 201,
      message: 'Account created sucessfully',
      token,
      data: userData
    });
  }

  /**
   * @author Caleb
   */
  static async login(req, res) {
    const { body } = req;

    const user = await User.findOne({ where: { email: body.email } });

    if (!user) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }
    const hashedPassword = await bcrypt.compare(body.password, user.get().password);

    if (!hashedPassword) {
      return res.status(401).json({ status: 401, message: "Email and password don't match" });
    }
    const token = jwt.sign({ id: user.id, userType: user.userType }, JWT_SECRET);
    await user.createToken({ token }); // Insert a new token from user's model
    const { password, ...userData } = user.get();
    return res.status(200).json({
      status: 200,
      message: 'User logged successfully',
      token,
      data: userData
    });
  }
}
