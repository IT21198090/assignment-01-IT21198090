const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'mongodb://localhost/TimetableDB';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

//routes 
const UserRouter = require('./routes/UserRt');
app.use('/UserRt', UserRouter);
const AdminRouter = require('./routes/AdminRt');
app.use('/AdminRt', AdminRouter);
const protectedRoutes = require('./routes/protectedRoutes');
app.use('/api', protectedRoutes);
const FacultyRouter = require('./routes/FacultyRt');
app.use('/FacultyRt', FacultyRouter);
const BkingRouter = require('./routes/BookingRt');
app.use('/BookingRt', BkingRouter);
const CourseRouter = require('./routes/CourseRt');
app.use('/CourseRt', CourseRouter);
const EnrolmentRoutes = require('./routes/EnrolmentRt');
app.use('/EnrolmentRt', EnrolmentRoutes);
const FMRouter = require('./routes/FacultyMemberRt');
app.use('/FacultyMemberRt', FMRouter);
const RoomRouter = require('./routes/RoomResourceRt');
app.use('/RoomResourceRt', RoomRouter);
const StudentRouter = require('./routes/StudentRt');
app.use('/StudentRt', StudentRouter);
const TimetblRouter = require('./routes/TimetableRt');
app.use('/TimetableRt', TimetblRouter);


// MongoDB connection
mongoose.connect(url, {useNewUrlParser: true});
const con = mongoose.connection;
con.on('open', () => {
    console.log('Connected to the database...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});