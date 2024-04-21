const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const isAdmin = require('../AuthMiddleWare/adminAuth'); // Import the isAdmin middleware

// GET all courses
router.get('/', async (req, res) => {
    try {
        // Retrieve all courses
        const courses = await Course.find();
        res.status(200).json({ courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/courses', isAdmin, async (req, res) => {
    try {
        // Ensure that the Code field is provided in the request body
        if (!req.body.Code) {
            return res.status(400).json({ error: 'Code field is required' });
        }

        const newCourse = new Course({
            Code: req.body.Code,
            Cname: req.body.Cname,
            Description: req.body.Description,
            credits: req.body.credits,
            faculty: req.body.faculty 
        });

        // Save the new course to the database
        const savedCourse = await newCourse.save();

        // Send a success response with the saved course object
        res.status(201).json(savedCourse);
    } catch (error) {
        // If an error occurs, send a 400 status code along with the error message
        res.status(400).json({ error: error.message });
    }
});

// PUT (update) an existing course (restricted to admins)
router.put('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    const { Code, Cname, Description, credits, faculty } = req.body;

    try {
        // Find the course by ID and update its fields
        const updatedCourse = await Course.findByIdAndUpdate(id, { Code, Cname, Description, credits, faculty }, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE an existing course (restricted to admins)
router.delete('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        // Find the course by ID and delete it
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
