// userUtil.js

const bcrypt = require('bcrypt');
const User = require('../models/User');

async function createUser(userData) {
    try {
        
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create a new user record
        const newUser = new User({
            name: userData.name,
            contact: userData.contact,
            email: userData.email,
            username: userData.username,
            password: hashedPassword,
            userType: userData.userType 
        });

        await newUser.save();

        return newUser;
    } catch (error) {
        throw error;
    }
}

module.exports = { createUser };
