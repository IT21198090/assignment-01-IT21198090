const mongoose = require('mongoose');
const moment = require('moment');

const bkngSchema = new mongoose.Schema({
    BookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FacultyMember',
        required: true
    },
    RoomResourceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomandResource',
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Validate time using moment.js
                return moment(value, 'HH:mm', true).isValid();
            },
            message: props => `${props.value} is not a valid time format. It should be in 'HH:mm' format.`
        }
    },
    endTime: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Validate time using moment.js
                return moment(value, 'HH:mm', true).isValid();
            },
            message: props => `${props.value} is not a valid time format. It should be in 'HH:mm' format.`
        }
    },
    purpose: {
        type: String,
        required: true
    },
    note: {
        type: String
    }
});

// Pre-save middleware to check for overlapping bookings
bkngSchema.pre('save', async function(next) {
    const newBooking = this;

    // Convert times to moments for easier comparisons
    const startTime = moment(newBooking.startTime, 'HH:mm');
    const endTime = moment(newBooking.endTime, 'HH:mm');

    // Check for overlapping confirmed bookings in the same room on the same date
    const overlappingBooking = await mongoose.model('Booking').findOne({
        RoomResourceID: newBooking.RoomResourceID,
        Date: newBooking.Date,
        startTime: { $lte: newBooking.endTime },
        endTime: { $gte: newBooking.startTime },
        status: 'Confirmed'
    });

    if (overlappingBooking) {
        const error = new Error('Booking overlaps with an existing confirmed booking.');
        next(error);
    } else {
        next();
    }
});

module.exports = mongoose.model('Booking', bkngSchema);
