// api
import deleteUploadedImage from "./deleteUploadedImage"
// firebase
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase.config"
// toastify
import { toast } from "react-toastify"


const deleteAgencyProfileData = async (docID, agencyLogoUrl) => {   
    try {
        // delete logo/image from storage
        await deleteUploadedImage(agencyLogoUrl);

        // delete doc
        await deleteDoc(doc(db, 'agencies', docID))

        return true
    } catch (error) {
        //error message
        toast.error('Greška prilikom uklanjanja podataka agencije.')          

        return false
    }
}

export default deleteAgencyProfileData