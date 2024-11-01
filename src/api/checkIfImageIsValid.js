// api
import storeUploadedImage from "./storeUploadedImage";
// toastify
import { toast } from "react-toastify";


const checkIfImageIsValid = async (image, title, date) => {
    if (image && image.name !== 'undefined' && image.size < 1000000) {
        try {
            return await storeUploadedImage('blogPostImages', image, title, date);
        } catch (error) {
            toast.error(`Error uploading image: ${image.name}`);
            console.error(error);
        }
    }
    return null;
};

export default checkIfImageIsValid