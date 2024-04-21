const express = require('express');
const Admin = require('../models/Admin');
const User = require('../models/User');
const isAdmin = require('../AuthMiddleWare/adminAuth'); // Import the isAdmin middleware
const router = express.Router();

// POST endpoint for creating a new admin
router.post('/InputDt', isAdmin, async (req, res) => {
    // Extract data from the request body
    const { userId, additionalEmail } = req.body;

    try {
        // Check if the user exists
        const userExists = await User.exists({ UId: userId });
        if (!userExists) {
            return res.status(400).json({ message: 'User with the provided userId does not exist' });
        }

        // Create a new admin document
        const admin = new Admin({ userId, additionalEmail });
        await admin.save();

        res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PATCH endpoint for updating additionalEmail of an admin by adminId
router.patch('/:adminId', isAdmin, async (req, res) => {
    const { adminId } = req.params;
    const { additionalEmail } = req.body;

    try {
        // Check if the admin exists
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Update the additionalEmail
        admin.additionalEmail = additionalEmail;
        await admin.save();

        res.json({ message: 'Admin additionalEmail updated successfully', admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET endpoint for retrieving all admins
router.get('/', isAdmin, async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET endpoint for retrieving a single admin by adminId
router.get('/:adminId', isAdmin, async (req, res) => {
    const { adminId } = req.params;

    try {
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.json(admin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE endpoint for deleting an admin by adminId
router.delete('/:adminId', isAdmin, async (req, res) => {
    const { adminId } = req.params;

    try {
        const admin = await Admin.findByIdAndDelete(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.json({ message: 'Admin deleted successfully', admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
