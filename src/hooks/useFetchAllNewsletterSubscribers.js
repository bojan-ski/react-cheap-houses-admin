import { useCallback, useState } from "react";
// firebase func
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify";


const useFetchAllNewsletterSubscribers = (itemsPerPage) => {
    const [allNewsletterSubscribers, setAllNewsletterSubscribers] = useState([]);
    const [pageSnapshots, setPageSnapshots] = useState([]);
    const [curSubscribersPage, setCurSubscribersPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllNewsletterSubscribers = useCallback(async (pageNumber = 0,  reset = false) => {        
        setIsLoading(true);

        try {
            let baseQuery = [
                collection(db, 'newsletterSubscribers'),
                orderBy('timestamp', 'desc'),
                limit(itemsPerPage),
            ]

            let q;

            if (reset || pageNumber === 0) {
                // Fetch the first page or reset to the first page
                q = query(
                    ...baseQuery
                );

                setPageSnapshots([]);
            } else if (pageNumber > curSubscribersPage) {
                // Moving forward, use the last snapshot of the current page              
                let lastVisible = pageSnapshots[pageSnapshots.length - 1];

                q = query(...baseQuery, startAfter(lastVisible));
            } else if (pageNumber < curSubscribersPage) {
                // Moving back, use the snapshot of the previous page
                let previousPageSnapshot = pageSnapshots[pageNumber - 1];

                q = query(...baseQuery, startAfter(previousPageSnapshot));
            }

            const querySnapshot = await getDocs(q);

            // Check if the end of the collection is reached
            if (querySnapshot.docs.length == 0 && pageNumber !== 0) {
                // Loop back to the first page
                setPageSnapshots([]);

                fetchAllNewsletterSubscribers(0, true);
                return;
            }

            // Update the last visible document for the next page
            const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setPageSnapshots([...pageSnapshots, newLastVisible]);

            // Replace the listings with the new set of documents for the current page
            setAllNewsletterSubscribers(querySnapshot.docs.map(doc => ({
                docId: doc.id,
                docData: doc.data()
            })));

            setCurSubscribersPage(pageNumber);
        } catch (error) {
            //error message
            toast.error('Greška prilikom prikazivanja svih pretplatnika')            
        }

        setIsLoading(false);
        
    }, [curSubscribersPage, itemsPerPage, pageSnapshots])

    return { allNewsletterSubscribers, fetchAllNewsletterSubscribers, curSubscribersPage, isLoading };
}

export default useFetchAllNewsletterSubscribers