import { useNavigate } from "react-router-dom";
// context
import { useGlobalContext } from "../../../context";
// firebase
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.config";
// toastify
import { toast } from "react-toastify";


const LogOutBtn = () => {
    const navigate = useNavigate()
    const { setUserData } = useGlobalContext()

    const logOutUser = async () => {
        if (window.confirm('Da li ste sigurni da želite da se odjavite')) {
            try {
                await signOut(auth)

                setUserData({
                    isLoggedIn: false,
                    userID: '',
                    userEmail: '',
                })

                // success message
                toast.success('Uspešno ste se odjavili');

                // redirect user
                navigate('/')
            } catch (error) {
                //error message
                toast.error('Greška prilikom odjave, molimo Vas probajte ponovo')
                console.log(error);
            }
        }
    }

    return (
        <button type="button" className="logout-btn btn btn-danger" onClick={logOutUser}>
            Odjavi se
        </button>
    )
}

export default LogOutBtn