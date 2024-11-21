// firebase/firestore funcs
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify"


const fetchSelectedDataFromFirebase = async (collectionName, id, placeholderText) => {   
    try {
        const docRef = doc(db, `${collectionName}`, id);
        const docSnap = await getDoc(docRef);

        return docSnap.data()
    } catch (error) {
        // error message
        toast.error(`Greška prilikom prikazivanja izabranog ${placeholderText}`)

        return null
    }
}

export default fetchSelectedDataFromFirebase