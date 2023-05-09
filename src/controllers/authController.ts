import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import User from '../models/User';
import User, { UserModel } from '../models/User';

const registerUser = async (req: Request, res: Response) => {
    console.log(req.body);

    const { email, password, fullName, alias, role } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user document
      const newUser: UserModel = new User({
        email,
        password: hashedPassword,
        fullName,
        alias,
        role,
      });

      // Save the user to the database
      await newUser.save();

      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, 'your-secret-key');

      // Return the token and user information
      res.status(201).json({ token, user: newUser });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        // console.log(req.body);

        // Find the user by email
        const user = await User.findOne({ email });
        console.log(user);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate an authentication token
        const token = user.generateAuthToken();

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

export default {
    registerUser,
    loginUser
};