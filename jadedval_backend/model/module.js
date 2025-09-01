import mongoose from 'mongoose';
const { Schema } = mongoose;

export const departmentModuleSchema = new Schema({
    materialName: { type: String, required: true, unique: true },
    materiallink: { type: String, required: true },
    department: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

export const accessCodeSchema = new Schema({
    code: { type: String, required: true, unique: true },
    isUsed: { type: Boolean, default: false },
    material: { type: Schema.Types.ObjectId, ref: 'DepartmentModules', required: true },
    usedAt: { type: Date }
} , { timestamps: true });

export const DepartmentModules = mongoose.model('DepartmentModules', departmentModuleSchema);
export const AccessCode = mongoose.model('AccessCodes', accessCodeSchema);

