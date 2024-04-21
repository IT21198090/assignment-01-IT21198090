const express = require('express');
const router = express.Router();
const Enrolment = require('../models/Enrolment');
const isAdmin = require('../AuthMiddleWare/adminAuth'); // Import the isAdmin middleware

// GET all enrollments
router.get('/', async (req, res) => {
    try {
        // Retrieve all enrollments
        const enrollments = await Enrolment.find();
        res.status(200).json({ enrollments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST a new enrollment
router.post('/', isAdmin, async (req, res) => {
    try {
        // Extract data from the request body
        const { SId, CId } = req.body;

        // Create a new enrollment instance
        const newEnrollment = new Enrolment({ SId, CId });

        // Save the new enrollment to the database
        const savedEnrollment = await newEnrollment.save();

        // Return a success response
        res.status(201).json({ message: 'Enrollment created successfully', enrollment: savedEnrollment });
    } catch (error) {
        // Handle errors
        console.error('Error creating enrollment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT (update) an existing enrollment
router.put('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    const { SId, CId } = req.body;

    try {
        // Find the enrollment by ID and update its fields
        const updatedEnrollment = await Enrolment.findByIdAndUpdate(id, { SId, CId }, { new: true });
        if (!updatedEnrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        res.status(200).json({ message: 'Enrollment updated successfully', enrollment: updatedEnrollment });
    } catch (error) {
        console.error('Error updating enrollment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE an existing enrollment
router.delete('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        // Find the enrollment by ID and delete it
        const deletedEnrollment = await Enrolment.findByIdAndDelete(id);
        if (!deletedEnrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        res.status(200).json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
        console.error('Error deleting enrollment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
