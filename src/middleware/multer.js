import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    const error = new Error('Only images allowed');
    error.status = 400;
    return cb(error, false);
  }

  return cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});