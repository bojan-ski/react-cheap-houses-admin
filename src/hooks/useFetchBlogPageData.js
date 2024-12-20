import { useCallback, useState } from "react";
// firebase func
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify";


const useFetchBlogPageData = (itemsPerPage) => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [pageSnapshots, setPageSnapshots] = useState([]);
    const [curBlogPage, setCurBlogPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchBlogPosts = useCallback(async (pageNumber = 0, searchTerm = '', reset = false) => {         
        setIsLoading(true);

        let updatedSnapshots = pageSnapshots;

        try {
            const baseQuery = [
                collection(db, 'blogPosts'),
                orderBy('timestamp', 'desc'),
                limit(itemsPerPage),
            ];

            if (searchTerm && searchTerm.length > 0) {
                baseQuery.push(where('newBlogPostTitle', '==', searchTerm));
            }

            let q;

            if (reset || pageNumber === 0) {
                // Fetch the first page or reset to the first page
                q = query(...baseQuery);

                updatedSnapshots = [];
                setPageSnapshots(updatedSnapshots);
            } else if (pageNumber > curBlogPage) {  
                // Moving forward, use the last snapshot of the current page              
                let lastVisible = updatedSnapshots[updatedSnapshots.length - 1];
              
                q = query(...baseQuery, startAfter(lastVisible));
            } else if (pageNumber < curBlogPage) {
                // Moving back, use the snapshot of the previous page
                let previousPageSnapshot = updatedSnapshots[pageNumber - 1];

                q = query(...baseQuery, startAfter(previousPageSnapshot));
            }

            const querySnapshot = await getDocs(q);          

            // Check if the end of the collection is reached
            if (querySnapshot.empty && pageNumber !== 0) {
                // Loop back to the first page
                updatedSnapshots = [];
                setPageSnapshots(updatedSnapshots);

                fetchBlogPosts(0, searchTerm, true);
                return;
            }

            // Update the last visible document for the next page
            const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];  
            updatedSnapshots = reset
                ? [newLastVisible]
                : [...updatedSnapshots, newLastVisible];
            setPageSnapshots(updatedSnapshots);

            // Replace the listings with the new set of documents for the current page
            setBlogPosts(querySnapshot.docs.map(doc => ({
                blogPostID: doc.id,
                blogPostData: doc.data()
            })));

            setCurBlogPage(pageNumber);
        } catch (error) {
            //error message
            toast.error('Greška prilikom prikazivanja svi Blog post-ova')         
        }

        setIsLoading(false);        

    }, [curBlogPage, itemsPerPage, pageSnapshots])

    return { blogPosts, fetchBlogPosts, curBlogPage, isLoading };
}

export default useFetchBlogPageData