import { useState, useCallback } from "react";
// firebase func
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify";


const useFetchSelectedUserListings = (itemsPerPage) => {    
    const [listings, setListings] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [page, setPage] = useState(0);

    const fetchListings = useCallback(async (pageNumber = 0, userID, reset = false) => {     
        try {
            let queryParameters = [
                collection(db, 'listings'),
                orderBy('timestamp', 'desc'),
                limit(itemsPerPage),
                where('userRef', '==', `${userID}`)
            ]

            let q;

            if (reset || pageNumber === 0) {
                // Fetch the first page or reset to the first page
                q = query(
                    ...queryParameters,
                );

                // Reset the last visible document when looping back
                setLastVisible(null);
            } else {
                // Fetch the next set based on the last visible document
                if (lastVisible) {
                    q = query(
                        collection(db, 'listings'),
                        ...queryParameters,
                        startAfter(lastVisible),
                    );
                } else {
                    return
                }
            }

            const querySnapshot = await getDocs(q);

            // Check if the end of the collection is reached
            if (querySnapshot.docs.length == 0 && pageNumber !== 0) {
                // Loop back to the first page
                fetchListings(0, userID, true);
                return;
            }

            // Update the last visible document for the next page
            const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLastVisible(newLastVisible);

            // Replace the listings with the new set of documents for the current page
            setListings(querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
            setPage(pageNumber);
        } catch (error) {
            //error message
            toast.error('Greška prilikom prikazivanja svi objavljenih oglasa izabranog korisnika')

            console.log(error);            
        }
        
    }, [itemsPerPage, lastVisible])

    return { listings, fetchListings, page };
}

export default useFetchSelectedUserListings