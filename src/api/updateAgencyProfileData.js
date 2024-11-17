// firebase/firestore funcs
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase.config"
// toastify
import { toast } from "react-toastify";


const updateAgencyProfileData = async (docID, agencyLogoUrl, agencyDesc) => {
    // console.log(docID);
    // console.log(agencyLogoUrl);
    // console.log(agencyDesc);

    try {
        const agencyProfileDataRef = doc(db, `agencies/${docID}`);

        const agencyUpdatedData = {
            ...(agencyLogoUrl != null && { agencyLogo: agencyLogoUrl }),
            ...(agencyDesc != '' && { agencyDescription: agencyDesc })
        };
        // console.log(agencyUpdatedData);
        
        // Update the document
        await updateDoc(agencyProfileDataRef, agencyUpdatedData);

        return true
    } catch (error) {
        // error message
        toast.error('Greška prilikom ažuriranja podata')
        console.error('Error updating document: ', error);

        return false
    }
}

export default updateAgencyProfileData