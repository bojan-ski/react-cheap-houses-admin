// firebase
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase.config"


const addAgency = async (newAgencyData) => {    
    try {
        await addDoc(collection(db, 'agencies'), newAgencyData)

        return true
    } catch (error) {
        console.error(error);

        return false
    }
}

export default addAgency