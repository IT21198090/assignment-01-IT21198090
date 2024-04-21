const express = require('express');
const router = express.Router();
const RoomandResource = require('../models/RoomandResource');

// GET all rooms and resources
router.get('/', async (req, res) => {
    try {
        const roomsAndResources = await RoomandResource.find();
        res.status(200).json({ roomsAndResources });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST a new room or resource
router.post('/', async (req, res) => {
    const { RID, Type, name, Description, Location, Capacity, Status } = req.body;

    try {
        const newRoomResource = new RoomandResource({ RID, Type, name, Description, Location, Capacity, Status });
        await newRoomResource.save();

        res.status(201).json({ message: 'Room or resource created successfully', roomResource: newRoomResource });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT (update) an existing room or resource
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { RID, Type, name, Description, Location, Capacity, Status } = req.body;

    try {
        const updatedRoomResource = await RoomandResource.findByIdAndUpdate(id, { RID, Type, name, Description, Location, Capacity, Status }, { new: true });
        if (!updatedRoomResource) {
            return res.status(404).json({ message: 'Room or resource not found' });
        }

        res.status(200).json({ message: 'Room or resource updated successfully', roomResource: updatedRoomResource });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE an existing room or resource
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRoomResource = await RoomandResource.findByIdAndDelete(id);
        if (!deletedRoomResource) {
            return res.status(404).json({ message: 'Room or resource not found' });
        }

        res.status(200).json({ message: 'Room or resource deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
