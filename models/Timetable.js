const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const moment = require('moment'); 

const timetblSchema = new mongoose.Schema({
    TId: {
        type: Number,
        required: true,
        unique: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    dayOfWeek: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomandResource',
        required: true
    }
}, {
    timestamps: true // Enable timestamps if desired
});

// Apply the auto-increment plugin to the TId field
timetblSchema.plugin(AutoIncrement, { inc_field: 'TId', start_seq: 1 });

// Custom validation for endTime being later than startTime
timetblSchema.path('endTime').validate(function(value) {
    const startTime = moment(this.startTime, 'HH:mm');
    const endTime = moment(value, 'HH:mm');
    
    // Check if endTime is later than startTime
    return endTime.isAfter(startTime);
}, 'endTime must be later than startTime');

// Pre-save middleware to check for overlapping timeslots
timetblSchema.pre('save', async function(next) {
    const newTimetable = this;
    
    // Check for existing timetables with the same location, day, and overlapping times
    const overlappingTimetable = await mongoose.model('Timetable').findOne({
        location: newTimetable.location,
        dayOfWeek: newTimetable.dayOfWeek,
        // Check for overlapping time periods
        startTime: { $lt: newTimetable.endTime },
        endTime: { $gt: newTimetable.startTime },
        // Exclude the current timetable (useful for updates)
        _id: { $ne: newTimetable._id }
    });
    
    if (overlappingTimetable) {
        const error = new Error('Timetable overlaps with an existing timetable.');
        return next(error);
    }
    
    next();
});

module.exports = mongoose.model('Timetable', timetblSchema);
