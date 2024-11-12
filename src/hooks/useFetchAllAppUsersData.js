import { useState } from "react";
// firebase func
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify";


const useFetchAllAppUsersData = (itemsPerPage) => {
    const [allUsersList, setAllUsersList] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [curUsersPage, setCurUsersPage] = useState(0);

    const fetchAllUsers = async (pageNumber = 0, searchTerm = '', reset = false) => {
        console.log('fetchAllUsers');

        try {
            let additionalQueryParams = [
                collection(db, 'users'),
                orderBy('timestamp', 'desc'),
                limit(itemsPerPage),
            ]

            if (searchTerm && searchTerm.length > 0) {
                additionalQueryParams.push(where('username', '==', searchTerm));
            }

            let q;

            if (reset || pageNumber === 0) {
                // Fetch the first page or reset to the first page
                q = query(
                    ...additionalQueryParams
                );

                // Reset the last visible document when looping back
                setLastVisible(null);
            } else {
                // Fetch the next set based on the last visible document
                if (lastVisible) {
                    q = query(
                        ...additionalQueryParams,
                        startAfter(lastVisible),
                    );
                }
            }

            const querySnapshot = await getDocs(q);

            // Check if the end of the collection is reached
            if (querySnapshot.docs.length == 0 && pageNumber !== 0) {
                // Loop back to the first page
                fetchAllUsers(0, searchTerm, true);
                return;
            }

            // Update the last visible document for the next page
            const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLastVisible(newLastVisible);

            // Replace the listings with the new set of documents for the current page
            setAllUsersList(querySnapshot.docs.map(doc => ({
                userID: doc.id,
                userData: doc.data()
            })));

            setCurUsersPage(pageNumber);
        } catch (error) {
            //error message
            toast.error('Greška prilikom prikazivanja svih korisnika')

            console.log(error);
            
        }
    };

    return { allUsersList, fetchAllUsers, curUsersPage };
}

export default useFetchAllAppUsersData