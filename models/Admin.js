const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminId: {
        type: String, 
        unique: true
    },
    userId: {
        type: Number,
        ref: 'User',
        required: true
    },
    additionalEmail: {
        type: String
    }
}, {
    timestamps: true // Enable timestamps
});

// Custom function to generate adminId with the desired format
async function generateAdminId() {
    return 'admn' + this.userId; // Concatenate 'admn' with the userId
}

// Pre-save hook to generate adminId before saving a new document
adminSchema.pre('save', async function (next) {
    // Generate adminId only if it's a new document
    if (this.isNew) {
        try {
            this.adminId = await generateAdminId.call(this);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('Admin', adminSchema);
