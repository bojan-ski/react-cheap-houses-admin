// firebase/firestore funcs
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify"


const fetchAllBlogPostsFromFirebase = async () => {
    try {
        const q = query(collection(db, 'blogPosts'), orderBy('timestamp', 'desc'))

        const querySnapshot = await getDocs(q)

        let allBlogPosts = []

        querySnapshot.forEach((document) => {
            return allBlogPosts.push({
                blogPostID: document.id,
                blogPostData: document.data()
            })
        })

        return allBlogPosts
    } catch (error) {
        //error message
        toast.error('Greška prilikom prikazivanja svi objavljenih blog postova, molimo Vas probajte ponovo')
    }
}

export default fetchAllBlogPostsFromFirebase