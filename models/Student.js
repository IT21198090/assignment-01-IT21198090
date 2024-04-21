
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String, 
        unique: true
    },
    userId: {
        type: Number,
        ref: 'User',
        required: true
    },
    faculty: {
        type: String,
        ref: 'Faculty',
        required: true
    }
}, {
    timestamps: true // Enable timestamps
});

// Custom function to generate studentId with the desired format
async function generateStudentId() {
    return 'stnd' + this.userId; // Concatenate 'stnd' with the userId
}

// Pre-save hook to generate studentId before saving a new document
studentSchema.pre('save', async function (next) {
    // Generate studentId only if it's a new document
    if (this.isNew) {
        try {
            this.studentId = await generateStudentId.call(this);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('Student', studentSchema);

/*{
	"name":"Shania Perera",
	"contact": "0113725252",
  "email": "itsmespp2@gmail.com",
  "username": "SP201",
  "password": "ilvcb97",
  "userType":"Student"
}
*/