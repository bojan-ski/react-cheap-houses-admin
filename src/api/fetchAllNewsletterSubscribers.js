// firebase/firestore funcs
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify";


const fetchAllNewsletterSubscribers = async () => {
    try {
        const q = query(collection(db, 'newsletterSubscribers'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);

        let allSubscribers = []

        querySnapshot.forEach((document) => {
            return allSubscribers.push({
                docId: document.id,
                docData: document.data()
            })
        })

        return allSubscribers;
    } catch (error) {
        // Error message
        toast.error('Greška prilikom prikazivanja svih pretplatnika');

        return [];
    }
}

export default fetchAllNewsletterSubscribers