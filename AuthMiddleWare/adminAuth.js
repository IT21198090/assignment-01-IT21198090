const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const User = require('../models/User');

const isAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).json({ message: 'No token provided' });
    }

        // Verify the token and extract the userId
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token.' });
            }

            // Get the user from the database using the userId
            const user = await User.findById(decoded.userId);
            if (!user || user.userType !== 'Admins') {
                return res.status(403).json({ message: 'Unauthorized access' });
            }
            
            // Store the user's ID in the request object for future use
            req.userId = decoded.userId;
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = isAdmin;
