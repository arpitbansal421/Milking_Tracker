const User = require('../../Database/authSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_KEY';

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

// Auth User - Handles both login and signup
// If user exists with that email, verify password
// If user doesn't exist, create new account
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        let user = await User.findOne({ email });

        // If user doesn't exist, create new account
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.create({
                email,
                password: hashedPassword
            });
            return res.status(201).json({
                message: 'Account created successfully',
                _id: user._id,
                email: user.email,
                token: generateToken(user._id)
            });
        }

        // If user exists, verify password
        if (await bcrypt.compare(password, user.password)) {
            res.status(200).json({
                message: 'Login successful',
                _id: user._id,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { authUser };