import { DepartmentModules, AccessCode, UploadedFile } from '../model/module.js';
import cloudinary from '../config/cloudinary.js';


// Endpoint to create a new module
export const createModule = async (req, res) => {
    try {
        const { materialName, department } = req.body;

        // Check if the module already exists
        const existingModule = await DepartmentModules.findOne({ materialName });
        if (existingModule) {
            return res.status(400).json({ message: 'Module already exists' });
        }
        // Create a new module
        const module = new DepartmentModules({
            materialName,
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
        const { department } = req.query;

        let query = {};
        if (department) {
            query.department = department;
        }

        const modules = await DepartmentModules.find(query)
            .sort({ createdAt: -1 })
            .select('-__v')
            .populate('uploads'); // optional: exclude Mongoose internal __v field

        return res.status(200).json(modules);
    } catch (error) {
        console.error('Error fetching modules:', error);
        return res.status(500).json({ message: 'Internal server error' });
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
        const { materialName, department } = req.body;
        
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
        if (!accessCodeDepart) {
            return res.status(404).json({ message: 'Access code not found' });
        }

        // Check if the access code belongs to the specified department
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

        if (accessCode && accessCode.material.department === department) {
            // const module = await DepartmentModules.find().sort({ createdAt: -1 }).where('department').equals(department).populate('uploads');

            // aggregate pipeline to get module base on department
            const aggregateModule = await DepartmentModules.aggregate([
                { $match: { department: department }},
                { $sort: { createdAt: -1 }},
                {
                    $lookup: {
                        from: 'uploadedfiles',
                        localField: 'uploads',
                        foreignField: '_id',
                        as: 'uploads'
                    }
                }
            ]);

            if (!aggregateModule.length === 0) {
                return res.status(404).json({ message: 'No modules found for this department' });
            }
            return res.status(200).json({ message: 'Access code is valid', materials: aggregateModule });
        }

    } catch (error) {
        console.error('Error validating access code:', error);
        res.status(500).json({ message: 'Something went wrong when validating access code or access code not valid' });
    }
}

// upload endpoint to upload files to a module
export const uploadFilesToModule = async (req, res) => {
    try {
        const { id } = req.params;
        const { uploadDate } = req.body;
        const file = req.file;

        if (!id || !file) {
            return res.status(400).json({ message: 'Module ID and file are required' });
        }

        const module = await DepartmentModules.findById(id);
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        // save to MongoDB
        const newFile = new UploadedFile({
            filename: file.originalname,
            fileUrl: file.path,
            publicId: file.filename,
            fileType: file.mimetype,
            fileSize: file.size,
            uploadedAt: uploadDate
        });
        
        await newFile.save();

        // Add the uploaded file reference to the module
        module.uploads.push(newFile._id);
        await module.save();

        return res.status(200).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
}

export const deleteUploadedFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        
        if (!fileId) {
            return res.status(400).json({ message: 'File ID is required' });
        }
        const file = await UploadedFile.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // delete from cloudinary
        const result = await cloudinary.uploader.destroy(file.publicId, { resource_type: "raw" });
        if (result.result !== 'ok' && result.result !== 'not found') {
            console.error('Error deleting file from Cloudinary:', result);
            return res.status(500).json({ message: 'Error deleting file from Cloudinary' });
        }

        // delete from DB
        await UploadedFile.findByIdAndDelete(fileId);

        // Optionally, remove the file reference from any modules
        await DepartmentModules.updateMany(
            { uploads: fileId },
            { $pull: { uploads: fileId } }
        );

        return res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ message: 'Error deleting file' }, error);
    }
}

export default {
    createModule,
    getAllModules,
    getModuleById,
    updateModuleById,
    deleteModuleById,
    validateAccessCode,
    uploadFilesToModule,
    deleteUploadedFile
}