const mongoose = require('mongoose');

const RsrcSchema = new mongoose.Schema({
    RID: {
        type: String,
        required: true,
        unique: true
    },
    Type: {
        type: String,
        enum: ['Room', 'Projector', 'Lab'],
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    Description: {
        type: String
    },
    Location: {
        type: String,
        required: true
    },
    Capacity: {
        type: Number,
        required: true
    },
    Status: {
        type: Boolean,
        required: true
    }
});


module.exports = mongoose.model('RoomandResource', RsrcSchema);
