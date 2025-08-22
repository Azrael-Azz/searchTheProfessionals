import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function register(req, res) {
    try {
        const { email, username, password } = req.body;

        const existing = await User.findOne({ username, email });
        if (existing) return res.status(400).send({ message: 'User already exists' });

        //10 is the level of complexity of encrypted password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, username, password: hashedPassword });
        await user.save();


    } catch (e) {
        return res.status(500).send(e);
    } finally {
        res.status(201).json({ message: "User registered successfully" });
    }

}

export async function login(req, res) {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const userCreds = await User.findOne({ username }).select('password');
        if (!userCreds) return res.status(404).send("User not found");

        // Check password
        const isMatch = await bcrypt.compare(password, userCreds.password);
        if (!isMatch) return res.status(401).send("Invalid credentials");

        // Generate token
        const token = jwt.sign({ id: userCreds._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Get user details excluding password
        const userData = await User.findOne({ username }).select('-password');

        // Return response
        res.json({ message: "Login successful", user: userData, token });

    } catch (e) {
        console.error(e); // Log error to debug
        return res.status(500).json({ error: "Internal server error" });
    }
}
