import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import sharp from "sharp";
import path from "path";
import heicConvert from "heic-convert";
// Configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const uploadOnCloudinary = async (localFilePath) => {
// try {
//   if (!localFilePath) return null;
//   const response = await cloudinary.uploader.upload(localFilePath, {
//     resource_type: "auto",
//   });
//   console.log("file is uploaded on clodinary", response.url);
//   fs.unlinkSync(localFilePath);
//   return response.url;
// } catch (error) {
//   console.log(error);
//   fs.unlinkSync(localFilePath);
//   return null;
// }
// };
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.error("No local file path provided for upload.");
      return null;
    }

    console.log("Attempting to upload file to Cloudinary:", localFilePath);
    //converting heic to jpeg
    if (path.extname(localFilePath).toLowerCase() === ".heic") {
      const newFilePath = localFilePath.replace(/\.heic$/i, ".jpg");
      try {
        const inputBuffer = fs.readFileSync(localFilePath);
        const outputBuffer = await heicConvert({
          buffer: inputBuffer,
          format: "JPEG",
        });
        fs.writeFileSync(newFilePath, outputBuffer);
        console.log("New file is created at ", newFilePath);
        if (newFilePath) {
          if (fs.existsSync(localFilePath)) {
            fs.unlink(localFilePath, (err) => {
              if (err) {
                console.error("Error deleting the local file:", err);
              } else {
                console.log("Local file deleted successfully");
              }
            });
          }
        }
        localFilePath = newFilePath;
      } catch (error) {
        console.log("Error while converting file to different format", error);
        return null;
      }
    } else if (path.extname(localFilePath).toLowerCase() != ".jpeg") {
      const newFilePath = localFilePath.replace(/\.heic$/i, ".jpg");
      try {
        await sharp(localFilePath).toFormat("jpeg").toFile(newFilePath);
        console.log("new file is created at ", newFilePath);
        if (newFilePath) {
          if (fs.existsSync(localFilePath)) {
            fs.unlink(localFilePath, (err) => {
              if (err) {
                console.error("Error deleting the local file:", err);
              } else {
                console.log("Local file deleted successfully");
              }
            });
          }
        }
        localFilePath = newFilePath;
      } catch (error) {
        console.log("error while converting file to different format", error);
        return null;
      }
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded to Cloudinary successfully:", response.url);

    // Asynchronously delete the file after uploading
    if (fs.existsSync(localFilePath)) {
      fs.unlink(localFilePath, (err) => {
        if (err) {
          console.error("Error deleting the local file:", err);
        } else {
          console.log("Local file deleted successfully");
        }
      });
    }
    return response.url;
  } catch (error) {
    console.error("Error occurred while uploading file to Cloudinary:", error);

    // Ensure that the file is deleted if an error occurs
    if (fs.existsSync(localFilePath)) {
      fs.unlink(localFilePath, (err) => {
        if (err) {
          console.error("Error deleting the local file on failure:", err);
        }
      });
    }
    return null;
  }
};

export { uploadOnCloudinary };
