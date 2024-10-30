// firebase funcs
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config';
// toastify
import { toast } from 'react-toastify';


const userSignIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)

        return true
    } catch (error) {
        //error message
        toast.error('Kredencijale koje ste uneli nisu validni, molimo Vas probajte ponovo')

        return false
    }
}

export default userSignIn