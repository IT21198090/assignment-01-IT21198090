const mongoose = require('mongoose');

const fcltySchema = new mongoose.Schema({
    FId: {
        type: String,
        //required: true,
        unique: true
    },
    fName: {
        type: String,
        //required: true
    },
    NoOfStdnts: {
        type: Number,
        //required: true
    }
},{
    timestamps: true
});


module.exports = mongoose.model('Faculty', fcltySchema);
