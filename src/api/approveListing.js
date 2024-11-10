// firebase
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config';
// toastify
import { toast } from 'react-toastify';


const approveListing = async (listingID) => {    
    try {
        const listingRef = doc(db, `listings/${listingID}`);

        await updateDoc(listingRef, {
            listingStatus: 'active',
        });

        return true
    } catch (error) {
        // error message
        toast.error('Greška prilikom odobravanja oglasa');
        
        return false
    }
}

export default approveListing