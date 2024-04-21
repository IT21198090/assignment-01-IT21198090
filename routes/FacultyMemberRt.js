const express = require('express');
const FacultyMember = require('../models/FacultyMember');
const User = require('../models/User');
const isAdmin = require('../AuthMiddleWare/adminAuth'); // Import the isAdmin middleware
const router = express.Router();

router.post('/InputDt',  async (req, res) => {
    // Extract data from the request body
    const { userId, faculty } = req.body;

    try {
        // Check if the user exists
        const userExists = await User.exists({ UId: userId });
        if (!userExists) {
            return res.status(400).json({ message: 'User with the provided userId does not exist' });
        }

        // Create a new facultymember document
        const fm = new FacultyMember({ userId, faculty });
        await fm.save();

        res.status(201).json({ message: 'Faculty Member created successfully', fm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET endpoint for retrieving a single faculty member by userId
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Check if the faculty member exists
        const facultyMember = await FacultyMember.findOne({ userId });
        if (!facultyMember) {
            return res.status(404).json({ message: 'Faculty member not found' });
        }

        res.json(facultyMember);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PATCH endpoint for updating faculty of a faculty member by userId
router.patch('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { faculty } = req.body;

    try {
        // Check if the faculty member exists
        const facultyMember = await FacultyMember.findOne({ userId });
        if (!facultyMember) {
            return res.status(404).json({ message: 'Faculty member not found' });
        }

        // Update the faculty
        facultyMember.faculty = faculty;
        await facultyMember.save();

        res.json({ message: 'Faculty member faculty updated successfully', facultyMember });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
