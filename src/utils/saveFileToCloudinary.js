import { v2 as cloudinary } from 'cloudinary';

import { getEnvVar } from './getEnvVar.js';

export const saveFileToCloudinary = (buffer, userId) =>
  new Promise((resolve, reject) => {
    cloudinary.config({
      cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
      api_key: getEnvVar('CLOUDINARY_API_KEY'),
      api_secret: getEnvVar('CLOUDINARY_API_SECRET'),
    });

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'nodejs-hw/avatars',
        public_id: userId.toString(),
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      }
    );

    stream.end(buffer);
  });