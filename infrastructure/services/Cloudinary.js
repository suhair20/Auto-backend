import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


class CloudinaryServices {
 
  async uploadImages(files) {
    const imageUploads = files.map(file => cloudinary.v2.uploader.upload(file.path));
    const imageResults = await Promise.all(imageUploads);
    const imageUrls = imageResults.map(result => result.secure_url);

    // Clean up temporary files
    files.forEach(file => {
      fs.unlink(path.resolve(file.path), err => {
        if (err) console.error('Error deleting temp file:', err);
      });
    });

    return imageUrls;
  }

}

export default CloudinaryServices;