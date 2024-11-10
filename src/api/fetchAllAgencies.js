// firebase/firestore funcs
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify";


const fetchAllAgencies = async () => {
    console.log('API - fetchAllAgencies');

    try {
        const q = query(collection(db, 'agencies'));
        const querySnapshot = await getDocs(q);

        let allAgencies = []

        querySnapshot.forEach((document) => {
            return allAgencies.push({
                id: document.id,
                data: document.data()
            })
        })

        return allAgencies;
    } catch (error) {
        // Error message
        toast.error('Greška prilikom prikazivanja svih agencija, molimo Vas probajte ponovo');

        return [];
    }
};

export default fetchAllAgencies;
