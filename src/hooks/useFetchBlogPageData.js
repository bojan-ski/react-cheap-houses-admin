import { useState } from "react";
// firebase func
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify";


const useFetchBlogPageData = (itemsPerPage) => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [page, setPage] = useState(0);

    const fetchBlogPosts = async (pageNumber = 0, searchTerm = '', reset = false) => {
        try {
            let additionalQueryParams = [
                collection(db, 'blogPosts'),
                orderBy('timestamp', 'desc'),
                limit(itemsPerPage),
            ]

            if (searchTerm && searchTerm.length > 0) {
                additionalQueryParams.push(where('newBlogPostTitle', '==', searchTerm));
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
                fetchBlogPosts(0, searchTerm, true);
                return;
            }

            // Update the last visible document for the next page
            const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLastVisible(newLastVisible);

            // Replace the listings with the new set of documents for the current page
            setBlogPosts(querySnapshot.docs.map(doc => ({
                blogPostID: doc.id,
                blogPostData: doc.data()
            })));

            setPage(pageNumber);
        } catch (error) {
            //error message
            toast.error('Greška prilikom prikazivanja svi Blog post-ova, molimo Vas probajte ponovo')
            console.log(error);
        }
    };

    return { blogPosts, fetchBlogPosts, page };
}

export default useFetchBlogPageData