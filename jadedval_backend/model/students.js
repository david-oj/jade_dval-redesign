import mongoose from 'mongoose';
const { Schema } = mongoose;

export const studentSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    interest: {
        type: String,
        enum: [
            'UI/UX Design',
            'Frontend Development',
            'Backend Development',
            'Mobile-development',
            'Digital Marketing',
        ],
        required: true
    },
    haveALaptop: { type: Boolean, default: false }
}, { timestamps: true });

export const partnerWithUs = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    howWouldYouLikeToPartner: { type: String, required: true }
}, { timestamps: true });

export const Student = mongoose.model('students', studentSchema);
export const Partner = mongoose.model('partners', partnerWithUs);
