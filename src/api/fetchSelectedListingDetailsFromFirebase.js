// firebase/firestore funcs
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify"

const fetchSelectedListingDetailsFromFirebase = async (id) => {
    try {
        const docRef = doc(db, "listings", id);
        const docSnap = await getDoc(docRef);        

        return docSnap.data()       
    } catch (error) {
        // error message
        toast.error('Greška prilikom prikazivanja izabranog oglasa, molimo Vas probajte ponovo')       
    }
}

export default fetchSelectedListingDetailsFromFirebase