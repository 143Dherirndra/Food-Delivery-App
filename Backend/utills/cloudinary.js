// import { v2 as cloudinary } from 'cloudinary'
// import fs from 'fs'

// const uploadCloudinary= async (file)=>{
//     cloudinary.config({ 
//   cloud_name: process.env.CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });
//     try {
//         const results= await cloudinary.uploader.upload(file);
//         fs.unlinkSync(file)
//         return results.secure_url

        
//     } catch (error) {
//         fs.unlinkSync(file)
//         console.log(error)
        
//     }
// }
// export default uploadCloudinary;

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadCloudinary = async (filePath) => {
  try {
    // ✅ Configure once (safe even if called multiple times)
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader.upload(filePath);

    // ✅ delete temp file after upload
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

export default uploadCloudinary;

