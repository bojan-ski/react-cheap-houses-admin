// components
import Auth from "./Auth"
import Navbar from "./Navbar"


const Header = () => {
    return (
        <header id="header" className="header px-2">
            <Auth />
            <Navbar />
        </header>
    )
}

export default Header