import { useState } from "react";
// firebase func
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify";


const useFetchBlogPageData = (itemsPerPage) => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [pageSnapshots, setPageSnapshots] = useState([]);
    // const [lastVisible, setLastVisible] = useState(null);
    const [curBlogPage, setCurBlogPage] = useState(0);

    const fetchBlogPosts = async (pageNumber = 0, searchTerm = '', reset = false) => {
        console.log('fetchBlogPosts');
        console.log(pageNumber);        
        
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
                console.log('reset');

                q = query(...baseQuery);
                setPageSnapshots([]);
            } else if (pageNumber > curBlogPage) {
                console.log('next');                
                console.log(pageSnapshots);
                
                let lastVisible = pageSnapshots[pageSnapshots.length - 1];
                console.log(lastVisible);                
                q = query(...baseQuery, startAfter(lastVisible));
            } else if (pageNumber < curBlogPage) {
                console.log('prev');
                console.log(pageSnapshots);

                let previousPageSnapshot = pageSnapshots[pageNumber - 1];
                console.log(previousPageSnapshot);

                q = query(...baseQuery, startAfter(previousPageSnapshot));
            }

            const querySnapshot = await getDocs(q);
            console.log(querySnapshot.empty);            

            // Check if the end of the collection is reached
            if (querySnapshot.empty && pageNumber !== 0) {
                // Loop back to the first page
                setPageSnapshots([]);
                fetchBlogPosts(0, searchTerm, true);
                return;
            }

            const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

            console.log(pageSnapshots);            
            // console.log(newLastVisible);
            // console.log(pageSnapshots.includes(newLastVisible));
            // console.log(pageSnapshots.some((snapshot) => snapshot.id == newLastVisible.id));            
 
            // const inPageSnapshots = pageSnapshots.some((snapshot) => snapshot.id == newLastVisible.id)
            // console.log(inPageSnapshots);
            
            // if(!inPageSnapshots){
            //     setPageSnapshots([...pageSnapshots, newLastVisible]);
            // }          
            
            setPageSnapshots([...pageSnapshots, newLastVisible]);


            // console.log(pageSnapshots.length);
            // if (pageNumber >= pageSnapshots.length) {
                //     setPageSnapshots([...pageSnapshots, newLastVisible]);
            
            // if (pageNumber >= pageSnapshots.length) {
            //     setPageSnapshots([...pageSnapshots, newLastVisible]);
            // }else{
            //     setPageSnapshots([newLastVisible]);
            // }


            // Replace the listings with the new set of documents for the current page
            setBlogPosts(querySnapshot.docs.map(doc => ({
                blogPostID: doc.id,
                blogPostData: doc.data()
            })));

            setCurBlogPage(pageNumber);
        } catch (error) {
            //error message
            toast.error('Greška prilikom prikazivanja svi Blog post-ova, molimo Vas probajte ponovo')

            console.log(error);
            
        }
    };

    console.log(pageSnapshots);
    

    return { blogPosts, fetchBlogPosts, curBlogPage };
}

// const useFetchBlogPageData = (itemsPerPage) => {
//     const [blogPosts, setBlogPosts] = useState([]);
//     const [lastVisible, setLastVisible] = useState(null);
//     const [curBlogPage, setCurBlogPage] = useState(0);

//     const fetchBlogPosts = async (pageNumber = 0, searchTerm = '', reset = false) => {
//         console.log('fetchBlogPosts');
        
//         try {
//             let additionalQueryParams = [
//                 collection(db, 'blogPosts'),
//                 orderBy('timestamp', 'desc'),
//                 limit(itemsPerPage),
//             ]

//             if (searchTerm && searchTerm.length > 0) {
//                 additionalQueryParams.push(where('newBlogPostTitle', '==', searchTerm));
//             }

//             let q;

//             if (reset || pageNumber === 0) {
//                 // Fetch the first page or reset to the first page
//                 q = query(
//                     ...additionalQueryParams
//                 );

//                 // Reset the last visible document when looping back
//                 setLastVisible(null);
//             } else {
//                 // Fetch the next set based on the last visible document
//                 if (lastVisible) {
//                     q = query(
//                         ...additionalQueryParams,
//                         startAfter(lastVisible),
//                     );
//                 }
//             }

//             const querySnapshot = await getDocs(q);

//             // Check if the end of the collection is reached
//             if (querySnapshot.docs.length == 0 && pageNumber !== 0) {
//                 // Loop back to the first page
//                 fetchBlogPosts(0, searchTerm, true);
//                 return;
//             }

//             // Update the last visible document for the next page
//             const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
//             setLastVisible(newLastVisible);

//             // Replace the listings with the new set of documents for the current page
//             setBlogPosts(querySnapshot.docs.map(doc => ({
//                 blogPostID: doc.id,
//                 blogPostData: doc.data()
//             })));

//             setCurBlogPage(pageNumber);
//         } catch (error) {
//             //error message
//             toast.error('Greška prilikom prikazivanja svi Blog post-ova, molimo Vas probajte ponovo')
//         }
//     };

//     return { blogPosts, fetchBlogPosts, curBlogPage };
// }

export default useFetchBlogPageData