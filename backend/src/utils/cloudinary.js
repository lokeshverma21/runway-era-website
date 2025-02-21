import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null

        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        //file uploaded successfully
        // console.log("File is uploaded on cloudinary", (await response).url);

        fs.unlinkSync(localFilePath)
        return response;


    } catch (error) {
        fs.unlinkSync(localFilePath) // this will remove the locally saved file as the upload operation got failed

        return null;
    }
}

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


export {uploadOnCloudinary}