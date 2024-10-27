const uploadFile = async (filePath) => {
    try {
        const result = await cloudinary_js_config.uploader.upload(filePath, {
            folder: 'your_folder_name', // Optional: specify a folder in your Cloudinary account
        });
        console.log('Upload Successful:', result);
        return result.secure_url; // Return the URL of the uploaded file
    } catch (error) {
        console.error('Upload Failed:', error);
        throw error; // Rethrow the error for further handling
    }
};
