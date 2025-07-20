import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function uploadImage(fileBuffer, options = {}) {
  try {
    const publicId = options.public_id || uuidv4();

    const avifBuffer = await sharp(fileBuffer).avif({ quality: 50 }).toBuffer();

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          folder: options.folder || "users/avatars",
          format: "avif",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(error);
          }
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      uploadStream.end(avifBuffer);
    });
  } catch (error) {
    console.error("AVIF conversion or Cloudinary error:", error);
    throw error;
  }
}
