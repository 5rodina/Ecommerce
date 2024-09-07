import multer, { diskStorage } from "multer";

const fileValidation = {
    image: ['image/jpeg', 'image/png'],
    file: ['application/pdf', 'application/msword']
};

export const cloudUpload = ({ allowfile = fileValidation.image} ) => {
    const storage = diskStorage({});
    const fileFilter = (req, file, cb) => {
        if (allowfile.includes(file.mimetype)) {
            return cb(null, true);
        }
        return cb(new Error('invalid file format'), false);
    };
    return multer({ storage, fileFilter });
};
