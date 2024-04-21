const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');
const isAdmin = require('../AuthMiddleWare/adminAuth'); // Import the isAdmin middleware

// GET all faculties
router.get('/', async (req, res) => {
    try {
        // Retrieve all faculties
        const faculties = await Faculty.find();
        res.status(200).json({ faculties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST a new faculty (restricted to admins)
router.post('/', isAdmin, async (req, res) => {
    const { FId, fName, NoOfStdnts } = req.body;

    try {
        // Log the request body
        console.log('Request body:', req.body);

        // Create a new faculty
        const newFaculty = new Faculty({ FId, fName, NoOfStdnts });
        await newFaculty.save();

        res.status(201).json({ message: 'Faculty created successfully', faculty: newFaculty });
    } catch (error) {
        console.error('Error creating new faculty:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// PUT (update) an existing faculty (restricted to admins)
router.put('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    const { fName, NoOfStdnts } = req.body;

    try {
        // Find the faculty by ID and update its fields
        const updatedFaculty = await Faculty.findByIdAndUpdate(id, { fName, NoOfStdnts }, { new: true });
        if (!updatedFaculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        res.status(200).json({ message: 'Faculty updated successfully', faculty: updatedFaculty });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
