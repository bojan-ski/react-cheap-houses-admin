// api
import deleteUploadedImage from "./deleteUploadedImage"
// firebase
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase.config"
// toastify
import { toast } from "react-toastify"


const deleteListing = async (listingID, imageUrls) => {
    try {
        // delete image/images from storage
        Array.from(imageUrls).forEach(imageUrl => {
            deleteUploadedImage(imageUrl)
        })

        // delete listing from firebase
        await deleteDoc(doc(db, 'listings', listingID))

        return true
    } catch (error) {
        //error message
        toast.error('Greška prilikom uklanjanja oglasa.')          

        return false
    }
}

export default deleteListing