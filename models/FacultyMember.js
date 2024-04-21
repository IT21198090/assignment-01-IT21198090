const mongoose = require('mongoose');

const facultyMemberSchema = new mongoose.Schema({
    fmId: {
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

// Custom function to generate fmId with the desired format
async function generateFMId() {
    return 'FM' + this.userId; // Concatenate 'stnd' with the userId
}

// Pre-save hook to generate fmId before saving a new document
facultyMemberSchema.pre('save', async function (next) {
    // Generate fmId only if it's a new document
    if (this.isNew) {
        try {
            this.fmId = await generateFMId.call(this);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});


module.exports = mongoose.model('FacultyMember', facultyMemberSchema);

/*{
	"name":"Felix Lee",
	"contact": "0762000915",
  "email": "itsmeflxlee00@skz.com",
  "username": "LYB00",
  "password": "fm1234",
  "userType":"FacultyMember"
}

{
	"message": "User registered successfully",
	"user": {
		"name": "Felix Lee",
		"contact": "0762000915",
		"email": "itsmeflxlee00@skz.com",
		"username": "LYB00",
		"password": "$2b$10$AH7sSlQN1gNJpjyuKvn0Y.XL5RrsD1WaSoCD2tKJtTPh3.GchzIcG",
		"userType": "FacultyMember",
		"_id": "6624e53fcf4476dba7f412df",
		"UId": 1,
		"__v": 0
	}
}
*/