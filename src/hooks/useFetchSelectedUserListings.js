import { useState, useCallback } from "react";
// firebase func
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify";


const useFetchSelectedUserListings = (itemsPerPage) => {
    const [listings, setListings] = useState([]);
    const [pageSnapshots, setPageSnapshots] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchListings = useCallback(async (pageNumber = 0, userID, reset = false) => {
        console.log('fetchListings - useFetchSelectedUserListings');

        setIsLoading(true);

        try {
            let baseQuery = [
                collection(db, 'listings'),
                orderBy('timestamp', 'desc'),
                limit(itemsPerPage),
                where('userRef', '==', `${userID}`)
            ]

            let q;

            if (reset || pageNumber === 0) {
                // Fetch the first page or reset to the first page
                q = query(
                    ...baseQuery,
                );

                setPageSnapshots([]);
            } else if (pageNumber > page) {
                // Moving forward, use the last snapshot of the current page              
                let lastVisible = pageSnapshots[pageSnapshots.length - 1];

                q = query(...baseQuery, startAfter(lastVisible));
            } else if (pageNumber < page) {
                // Moving back, use the snapshot of the previous page
                let previousPageSnapshot = pageSnapshots[pageNumber - 1];

                q = query(...baseQuery, startAfter(previousPageSnapshot));
            }

            const querySnapshot = await getDocs(q);

            // Check if the end of the collection is reached
            if (querySnapshot.docs.length == 0 && pageNumber !== 0) {
                // Loop back to the first page
                setPageSnapshots([]);

                fetchListings(0, userID, true);
                return;
            }

            // Update the last visible document for the next page
            const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setPageSnapshots([...pageSnapshots, newLastVisible]);

            // Replace the listings with the new set of documents for the current page
            setListings(querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
            setPage(pageNumber);
        } catch (error) {
            //error message
            toast.error('Greška prilikom prikazivanja svi objavljenih oglasa izabranog korisnika')

            console.log(error);
        }

        setIsLoading(false);
    }, [page, itemsPerPage, pageSnapshots])

    return { listings, fetchListings, page, isLoading };
}

export default useFetchSelectedUserListings