const express = require('express');
const Student = require('../models/Student');
const User = require('../models/User');
const isAdmin = require('../AuthMiddleWare/adminAuth'); // Import the isAdmin middleware
const router = express.Router();

// GET endpoint for retrieving a single student by userId
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Check if the student exists
        const student = await Student.findOne({ userId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PATCH endpoint for updating faculty of a student by userId
router.patch('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { faculty } = req.body;

    try {
        // Check if the student exists
        const student = await Student.findOne({ userId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update the faculty
        student.faculty = faculty;
        await student.save();

        res.json({ message: 'Student faculty updated successfully', student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
