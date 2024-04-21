const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const RoomandResource = require('../models/RoomandResource');

// GET all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('BookedBy RoomResourceID');
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST a new booking
router.post('/', async (req, res) => {
    const { BookedBy, RoomResourceID, Date, startTime, endTime, purpose, note } = req.body;

    try {
        const newBooking = new Booking({ BookedBy, RoomResourceID, Date, startTime, endTime, purpose, note });
        await newBooking.save();

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT (update) an existing booking
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Date, startTime, endTime, purpose, note } = req.body;

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, { Date, startTime, endTime, purpose, note }, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE an existing booking
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
