import { AccessCode, DepartmentModules } from '../model/module.js';
import StudentProfile from '../model/profile.js';

// Generate access code for modules
export const generateAccessCode = async (department) => {
    let departmentMaterial = await DepartmentModules.findOne({ department });
    if (!departmentMaterial) {
        departmentMaterial = new DepartmentModules({
            materialName: `${department} Default Material`,
            materiallink: "http://placeholder.link", 
            department
        });
        await departmentMaterial.save();
    }

    const year = new Date().getFullYear();
    const randomAlphNum = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `JDVA-${year}-${randomAlphNum}`;

    // Create a new AccessCode document
    const accessCode = new AccessCode({
        code,
        isUsed: false,
        material: departmentMaterial._id,
    });
    await accessCode.save();
    return accessCode;
}

// Regenerate access code 
export const regenerateAccessCode = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await StudentProfile.findById(id).populate('accessCode');

        if (!student) return res.status(404).json({ message: "Student with "+ id + " not found!"});

        // delete the previous access code for the student and regenerate another one
        deleteAccessCode(id);
        const newAccessCode = generateAccessCode(student.department);

        // update student profile
        student.accessCode = newAccessCode._id;
        student.save();
        return res.status(200).json({
            message: 'New access code generated',
            accessCode: newAccessCode.code
        });
    } catch (error) {
        console.error('Error regenerating access code:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteAccessCode = async (studentId) => {
    try {
        const student = await StudentProfile.findById(studentId).populate('accessCode');
        if (!student) {
            return { message: "Can't delete access code for a different student Id or incorrect student Id"}
        };

        if (!student.accessCode) {
            return { message: "This student does not have an access code assigned."}
        };

        // delete access code 
        await AccessCode.findByIdAndDelete(student.accessCode._id);

        // unset access code field in the student profile
        student.accessCode = undefined;
        await student.save();
    } catch (error) {
        console.error(error);
        return { message: "Error deleting access code", error: error.message };
    }
}

export default {regenerateAccessCode, generateAccessCode };