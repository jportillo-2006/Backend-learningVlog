import mongoose from 'mongoose';

const CourseSchema = mongoose.Schema({
    course: {
        type: String,
        required: [true, 'course is required'],
    },
    teacher: {
        type: String,
        required: [true, 'Teacher is required'],
    }
});

export default mongoose.model('Course', courseSchema);