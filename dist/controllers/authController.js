"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import User from '../models/User';
const User_1 = __importDefault(require("../models/User"));
const registerUser = async (req, res) => {
    console.log(req.body);
    const { email, password, fullName, alias, role } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }
        // Hash the password
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        // Create a new user document
        const newUser = new User_1.default({
            email,
            password: hashedPassword,
            fullName,
            alias,
            role,
        });
        // Save the user to the database
        await newUser.save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, 'your-secret-key');
        // Return the token and user information
        res.status(201).json({ token, user: newUser });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(req.body);
        // Find the user by email
        const user = await User_1.default.findOne({ email });
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
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};
exports.loginUser = loginUser;
exports.default = {
    registerUser: exports.registerUser,
    loginUser: exports.loginUser
};
