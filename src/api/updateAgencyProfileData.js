// firebase/firestore funcs
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase.config"
// toastify
import { toast } from "react-toastify";


const updateAgencyProfileData = async (docID, agencyLogoUrl, agencyDesc) => {
    try {
        const agencyProfileDataRef = doc(db, `agencies/${docID}`);

        const agencyUpdatedData = {
            ...(agencyLogoUrl != null && { agencyLogo: agencyLogoUrl }),
            ...(agencyDesc != '' && { agencyDescription: agencyDesc })
        };
        
        // Update document
        await updateDoc(agencyProfileDataRef, agencyUpdatedData);

        return true
    } catch (error) {
        // error message
        toast.error('Greška prilikom ažuriranja podata')

        return false
    }
}

export default updateAgencyProfileData