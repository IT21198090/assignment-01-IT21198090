const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');
const isAdmin = require('../AuthMiddleware/adminAuth'); // Import the isAdmin middleware

// GET all timetables
router.get('/', async (req, res) => {
    try {
        const timetables = await Timetable.find();
        res.status(200).json({ timetables });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST a new timetable (restricted to admins)
router.post('/', isAdmin, async (req, res) => {
    const { course, dayOfWeek, startTime, endTime, location } = req.body;

    try {
        const newTimetable = new Timetable({ course, dayOfWeek, startTime, endTime, location });
        await newTimetable.save();

        res.status(201).json({ message: 'Timetable created successfully', timetable: newTimetable });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT (update) an existing timetable (restricted to admins)
router.put('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    const { course, dayOfWeek, startTime, endTime, location } = req.body;

    try {
        const updatedTimetable = await Timetable.findByIdAndUpdate(id, { course, dayOfWeek, startTime, endTime, location }, { new: true });
        if (!updatedTimetable) {
            return res.status(404).json({ message: 'Timetable not found' });
        }

        res.status(200).json({ message: 'Timetable updated successfully', timetable: updatedTimetable });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE an existing timetable (restricted to admins)
router.delete('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTimetable = await Timetable.findByIdAndDelete(id);
        if (!deletedTimetable) {
            return res.status(404).json({ message: 'Timetable not found' });
        }

        res.status(200).json({ message: 'Timetable deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
