const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    UId: {
        type: Number,
        unique: true      
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['Student', 'FacultyMember', 'Admins'],
        required: true
    }
});

// Apply the auto-increment plugin to the UId field
userSchema.plugin(AutoIncrement, { inc_field: 'UId', start_seq: 1 });

module.exports = mongoose.model('User', userSchema);
