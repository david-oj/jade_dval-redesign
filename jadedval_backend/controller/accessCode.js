import { AccessCode, DepartmentModules } from '../model/module.js';
import StudentProfile from '../model/profile.js';

// Generate access code for modules
export const generateAccessCode = async (department) => {
    let departmentMaterial = await DepartmentModules.findOne({ department });
    if (!departmentMaterial) {
        return { message: `No module found for department: ${department}. Please create one first.` }
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

        if (!student) 
            return res.status(404).json({ message: `Student with ID ${id} not found!` });

        // If old access code exists and has been used, delete it
        if (student.accessCode && student.accessCode.isUsed) {
            await deleteAccessCode(id);
        }

        const materal = await DepartmentModules.findOne({ department: student.department });
        if (!materal) {
            return res.status(400).json({ message: `No module found for department: ${student.department}. Please create one first.` });
        }

        // Generate a new access code
        const newAccessCode = await generateAccessCode(student.department);

        // Link access code back to student
        student.accessCode = newAccessCode._id;
        await student.save();

        return res.status(200).json({
            message: 'New access code generated successfully',
            accessCode: newAccessCode.code
        });
    } catch (error) {
        console.error('Error regenerating access code:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

// Get access code
export const getAccessCode = async (req, res) => {
    try {
        const { code } = req.query
        if (!code) {
            return res.status(400).json({ message: 'Access code is required' });
        }
        
        const accessCode = await AccessCode.findOne({ code }).populate("material");
        if (!accessCode) {
            return res.status(404).json({ message: 'Access code not found' });
        }
        return res.status(200).json(accessCode);
    } catch (error) {
        console.error('Error fetching access code:', error);
        res.status(500).json({ message: 'Error fetching access code or Internal server error' });
    }
}

export const deleteAccessCode = async (studentId) => {
    try {
        const student = await StudentProfile.findById(studentId).populate('accessCode');
        if (!student) {
            throw new Error("Invalid student ID or student not found");
        }

        if (!student.accessCode) {
            throw new Error("This student does not have an access code assigned");
        }

        // delete access code 
        await AccessCode.findByIdAndDelete(student.accessCode._id);

        // unset access code field in the student profile
        student.accessCode = undefined;
        await student.save();

        return { success: true, message: "Access code deleted successfully" };
    } catch (error) {
        console.error(error);
        throw new Error(error.message || "Error deleting access code");
    }
};


export default { regenerateAccessCode, generateAccessCode, getAccessCode };