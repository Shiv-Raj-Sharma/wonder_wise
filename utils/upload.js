
import cloudinary from "../config/cloudinary";
import fs from "fs";

export const fileUpload = async (path, folder) => {
    const result = await cloudinary.uploader.upload(path, {
        folder,
        resource_type: "auto",
        overwrite: false,
        use_filename: true,
        unique_filename: true,
    });

    fs.unlinkSync(path);

    return result;
}