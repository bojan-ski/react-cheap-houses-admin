// firebase
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase.config"
// toastify
import { toast } from "react-toastify"


const postNewBlogPost = async (newBlogPostData) => {
    try {
        await addDoc(collection(db, 'blogPosts'), newBlogPostData)

        return true
    } catch (error) {
        // error message
        toast.error('Greška prilikom objavljivanja Vašeg Blog post-a, molimo Vas probajte ponovo')

        return false
    }
}

export default postNewBlogPost