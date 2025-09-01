import { DepartmentModules, AccessCode } from '../model/module.js';

// Endpoint to create a new module
export const createModule = async (req, res) => {
    try {
        const { materialName, materiallink, department } = req.body;

        // Check if the module already exists
        const existingModule = await DepartmentModules.findOne({ materialName });
        if (existingModule) {
            return res.status(400).json({ message: 'Module already exists' });
        }
        // Create a new module
        const module = new DepartmentModules({
            materialName,
            materiallink,
            department
        });
        module.save();
        return res.status(201).json({ message: 'Module created successfully', module });
    } catch (error) {
        console.error('Error creating module:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Endpoint to get all modules
export const getAllModules = async (req, res) => {
    try {
        const modules = await DepartmentModules.find().sort({ createdAt: -1 });
        res.status(200).json(modules);
    } catch (error) {
        console.error('Error fetching modules:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Endpoint to get a module by ID
export const getModuleById = async (req, res) => {
    try {
        const { id } = req.params;
        const module = await DepartmentModules.findById(id);

        if (!module) {
            return res.status(404).json({ message: 'Module not found!' });
        }
        return res.status(200).json(module);
    } catch (error) {
        console.error('Error fetching module:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Endpoint to update a module by ID
export const updateModuleById = async (req, res) => {
    try {
        const { id } = req.params;
        const { materialName, materiallink, department } = req.body;
        
        const module = await DepartmentModules.findByIdAndUpdate({
            id,
            materialName,
            materiallink,
            department
        }, { new: true });

        if (!module) {
            return res.status(404).json({ message: 'Module not found!' });
        }
        return res.status(200).json({ message: 'Module updated successfully', module });
    } catch (error) {
        console.error('Error updating module:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Endpoint to delete a module by ID
export const deleteModuleById = async (req, res) => {
    try {
        const { id } = req.params;
        const module = await DepartmentModules.findByIdAndDelete(id);

        if (!module) {
            return res.status(404).json({ message: 'Module not found!' });
        }
        return res.status(200).json({ message: 'Module deleted successfully' });
    } catch (error) {
        console.error('Error deleting module:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Endpoint to check if access code have been used
export const validateAccessCode = async (req, res) => {
    try {
        const { code, department } = req.body; // keep everything in body

        if (!code || !department) {
            return res.status(400).json({ message: 'Code and department are required' });
        }

        const accessCodeDepart = await AccessCode.findOne({ code }).populate("material");
        if (accessCodeDepart.material.department !== department) {
            return res.status(400).json({ message: 'Access code does not belong to your department' });
        }

        const accessCode = await AccessCode.findOneAndUpdate(
            { code, isUsed: false },
            { isUsed: true, usedAt: new Date() },
            { new: true }
        ).populate("material");

        if (!accessCode) {
            return res.status(404).json({ message: 'Invalid or already used access code' });
        }

        return res.status(200).json({
            message: 'Access code is valid',
            material: accessCode.material
        });

    } catch (error) {
        console.error('Error validating access code:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default {
    createModule,
    getAllModules,
    getModuleById,
    updateModuleById,
    deleteModuleById,
    validateAccessCode
}