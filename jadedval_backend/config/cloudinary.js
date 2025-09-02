import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from './config.js';
import multer from 'multer';

// Cloudinary configuration
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

// Multer configuration for file uploads
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'jadedval_academy',
        allowed_formats: ['jpg', 'png', 'pdf', 'docx', 'pptx', 'mp4', 'mov'],
        resource_type: 'auto', // Automatically detect the file type
    },
});

export const upload = multer({ storage: storage });

export default cloudinary;
