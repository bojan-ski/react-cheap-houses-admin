import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Store images in Firebase
const storeUploadedImage = async (storageFile, uploadedImage, newBlogPostTitle, currentDate) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage();
        const storageRef = ref(storage, `${storageFile}/${newBlogPostTitle}-${currentDate}/${uploadedImage.name}`);

        const uploadTask = uploadBytesResumable(storageRef, uploadedImage);

        uploadTask.on(
            'state_changed',
            null,
            reject,
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(resolve)
                    .catch(reject);
            }
        );
    });
};

export default storeUploadedImage;