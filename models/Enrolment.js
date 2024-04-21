const mongoose = require('mongoose');

const enrlmntSchema = new mongoose.Schema({
    SId: {
        type: String,
        ref: 'Student',
        required: true
    },
    CId: {
        type: String,
        ref: 'Course',
        required: true
    }
},
{
    timestamps: true // Enable timestamps
});


module.exports = mongoose.model('Enrolment', enrlmntSchema);
