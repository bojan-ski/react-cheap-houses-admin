// api
import storeUploadedImage from "./storeUploadedImage";
// toastify
import { toast } from "react-toastify";


const checkIfImageIsValid = async (storageName, image, title, date) => {
    if (image && image.name !== 'undefined' && image.size < 1000000) {
        try {
            return await storeUploadedImage(storageName, image, title, date);
        } catch (error) {
            toast.error(`Greška prilikom upload-a slike: ${image.name}`);
        }
    }
    return null;
};

export default checkIfImageIsValid