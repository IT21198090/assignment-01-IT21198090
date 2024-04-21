const express = require('express');
const router = express.Router();
const verifyToken = require('../AuthMiddleWare/tokenVerification');

router.get('/protected', verifyToken, (req, res) => {
    // Access the decoded user payload from the request object
    const user = req.user;
    res.json({ message: 'Protected route', user });
});

module.exports = router;
