const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    Code: {
        type: String,
        required: true,
        unique: true
    },
    Cname: {
        type: String,
        required: true
    },
    Description: {
        type: String
    },
    credits: {
        type: Number,
        required: true
    },
    faculty: {
        type: String,
        ref: 'Faculty',
        required: true
    }
});


module.exports = mongoose.model('Course', courseSchema);
