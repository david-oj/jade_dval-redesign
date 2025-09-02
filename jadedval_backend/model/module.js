import mongoose from 'mongoose';
const { Schema } = mongoose;

export const departmentModuleSchema = new Schema({
    materialName: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    date: { type: Date, default: Date.now },
    uploads: [{ type: Schema.Types.ObjectId, ref: 'UploadedFiles' }]
}, { timestamps: true });

export const updloadedFileSchema = new Schema({
    filename: { type: String, required: true },
    fileUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const accessCodeSchema = new Schema({
    code: { type: String, required: true, unique: true },
    isUsed: { type: Boolean, default: false },
    material: { type: Schema.Types.ObjectId, ref: 'DepartmentModules', required: true },
    usedAt: { type: Date }
} , { timestamps: true });

export const DepartmentModules = mongoose.model('DepartmentModules', departmentModuleSchema);
export const AccessCode = mongoose.model('AccessCodes', accessCodeSchema);
export const UploadedFile = mongoose.model('UploadedFiles', updloadedFileSchema);

