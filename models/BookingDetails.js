const mongoose = require('mongoose');

const bkngDtlsSchema = new mongoose.Schema({
    BookingID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    RoomResourceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomandResource',
        required: true
    }
},
{
    timestamps: true // Enable timestamps
});


module.exports = mongoose.model('BookingDetails', bkngDtlsSchema);
