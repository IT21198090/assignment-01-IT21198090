const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        // Attach the decoded token payload to the request object for use in subsequent middleware
        req.user = user;
        next();
    });
};

module.exports = verifyToken;
