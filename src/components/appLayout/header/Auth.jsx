import { Link } from 'react-router-dom'
// context
import { useGlobalContext } from '../../../context'
// asset
import headerLogo from '../../../assets/header-assets/jeftine_kuce_logo_text_header.png'


const Auth = () => {
    const { userData } = useGlobalContext()

    return (
        <div className="auth container-fluid d-flex align-items-center justify-content-between py-2 border-bottom">
            <div className="navbar-brand">
                <img src={headerLogo} alt="portal jeftine kuce - logo" />
            </div>

            <div className="header-btn-container d-flex align-items-center">
                {userData.userEmail ? (
                    <>
                        <p className='d-none d-md-block mb-0 fw-bold text-muted me-3'>
                            Dobrodošli Admin
                            {/* <span className='ms-2 text-dark'>
                                {userData.userEmail}
                            </span> */}
                        </p>

                        <button type="button" className="logout-btn btn btn-danger">
                            Odjavi se
                        </button>
                    </>
                ) : (
                    <Link className="login-btn btn bg-orange border" to='/'>
                        Prijavi se
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Auth