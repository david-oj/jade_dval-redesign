import mongoose from 'mongoose';

const { Schema } = mongoose;

const studentProfileSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    password: { type: String, required: false },

    // reference to access codes used by the student
    accessCode: { type: mongoose.Schema.Types.ObjectId, ref: 'AccessCodes', default: null }
}, { timestamps: true });

const StudentProfile = mongoose.model('StudentProfiles', studentProfileSchema);

export default StudentProfile;
