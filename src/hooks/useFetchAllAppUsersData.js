import { useCallback, useState } from "react";
// firebase func
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify";


const useFetchAllAppUsersData = (itemsPerPage) => {
    const [allUsersList, setAllUsersList] = useState([]);
    const [pageSnapshots, setPageSnapshots] = useState([]);
    const [curUsersPage, setCurUsersPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllUsers = useCallback(async (pageNumber = 0, searchTerm = '', reset = false) => {        
        setIsLoading(true);

        try {
            let baseQuery = [
                collection(db, 'users'),
                orderBy('timestamp', 'desc'),
                limit(itemsPerPage),
            ]

            if (searchTerm && searchTerm.length > 0) {
                baseQuery.push(where('username', '==', searchTerm));
            }

            let q;

            if (reset || pageNumber === 0) {
                // Fetch the first page or reset to the first page
                q = query(
                    ...baseQuery
                );

                setPageSnapshots([]);
            } else if (pageNumber > curUsersPage) {
                // Moving forward, use the last snapshot of the current page              
                let lastVisible = pageSnapshots[pageSnapshots.length - 1];

                q = query(...baseQuery, startAfter(lastVisible));
            } else if (pageNumber < curUsersPage) {
                // Moving back, use the snapshot of the previous page
                let previousPageSnapshot = pageSnapshots[pageNumber - 1];

                q = query(...baseQuery, startAfter(previousPageSnapshot));
            }

            const querySnapshot = await getDocs(q);

            // Check if the end of the collection is reached
            if (querySnapshot.docs.length == 0 && pageNumber !== 0) {
                // Loop back to the first page
                setPageSnapshots([]);

                fetchAllUsers(0, searchTerm, true);
                return;
            }

            // Update the last visible document for the next page
            const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setPageSnapshots([...pageSnapshots, newLastVisible]);

            // Replace the listings with the new set of documents for the current page
            setAllUsersList(querySnapshot.docs.map(doc => ({
                userID: doc.id,
                userData: doc.data()
            })));

            setCurUsersPage(pageNumber);
        } catch (error) {
            //error message
            toast.error('Greška prilikom prikazivanja svih korisnika')            
        }

        setIsLoading(false);
        
    }, [curUsersPage, itemsPerPage, pageSnapshots])

    return { allUsersList, fetchAllUsers, curUsersPage, isLoading };
}

export default useFetchAllAppUsersData