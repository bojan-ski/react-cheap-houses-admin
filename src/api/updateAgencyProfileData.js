// firebase/firestore funcs
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase.config"
// toastify
import { toast } from "react-toastify";


const updateAgencyProfileData = async (docID, agencyLogoUrl, agencyDesc) => {
    console.log(docID);
    console.log(agencyLogoUrl);
    console.log(agencyDesc);

    try {
        const agencyProfileDataRef = doc(db, `agencies/${docID}`);

        const agencyUpdatedData = {
            agencyLogo: agencyLogoUrl,
            agencyDescription: agencyDesc
        }

        // Update the document
        await updateDoc(agencyProfileDataRef, agencyUpdatedData);

        return true
    } catch (error) {
        // error message
        toast.error('Greška prilikom ažuriranja podata')

        console.error('Error updating document: ', error);
    }
}

export default updateAgencyProfileData