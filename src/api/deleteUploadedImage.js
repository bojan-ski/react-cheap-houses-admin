// firebase/firestore funcs
import { getStorage, ref, deleteObject } from "firebase/storage";
// toastify
import { toast } from "react-toastify"


const deleteUploadedImage = async (imageUrl) => {
    try {
        const url = new URL(imageUrl);
        const uploadedImagePath = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);

        const storage = getStorage();

        const storageRef = ref(storage, `${uploadedImagePath}`);

        await deleteObject(storageRef);
    } catch (error) {
        //error message
        toast.error('Greška prilikom uklanjanja slike/slika, molimo Vas probajte ponovo')
    }
}

export default deleteUploadedImage
