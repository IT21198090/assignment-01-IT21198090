const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser } = require('./userUtil');
const User = require('../models/User');
const { secretKey } = require('../config');

// JWT Authentication middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        // Store the decoded user ID in the request object for future use
        req.userId = decoded.userId;
        next();
    });
};

// Register endpoint
router.post('/register', async (req, res) => {
    // Extract user data from request body
    const { name, contact, email, username, password, userType } = req.body;

    try {
        // Call the createUser function with user data
        const newUser = await createUser({ name, contact, email, username, password, userType });

        // Return success response along with the created user object
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token using secretKey from config
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        // Return success response with token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET user details endpoint
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        // Get the user ID from the request object
        const userId = req.params.userId;

        // Check if the requested user ID matches the logged-in user's ID
        if (userId !== req.userId) {
            return res.status(403).json({ message: 'Forbidden. You do not have permission to access this resource.' });
        }

        // Find the user by ID and exclude sensitive fields
        const user = await User.findById(userId).select('-password');

        // Return user details
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update user details endpoint
router.patch('/:userId', verifyToken, async (req, res) => {
    try {
        // Get the user ID from the request object
        const userId = req.params.userId;

        // Check if the requested user ID matches the logged-in user's ID
        if (userId !== req.userId) {
            return res.status(403).json({ message: 'Forbidden. You do not have permission to access this resource.' });
        }

        // Extract fields to be updated from request body
        const { name, contact, email } = req.body;

        // Create an object with only the allowed fields
        const updatedFields = {};
        if (name) updatedFields.name = name;
        if (contact) updatedFields.contact = contact;
        if (email) updatedFields.email = email;

        // Update user details
        await User.findByIdAndUpdate(userId, updatedFields);

        res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
