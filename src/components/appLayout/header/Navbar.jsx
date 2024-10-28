import { Link, NavLink } from "react-router-dom"
// data
import appNavigationLinks from "../../../data/appNavigationLinks.js"
// React Icons
import { BsHouseHeart } from "react-icons/bs"
import { IoReorderThreeOutline } from "react-icons/io5"


import headerLogo from '../../../assets/header-assets/jeftine_kuce_logo_text_whit_small.png'


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md">
            <div className="container-fluid">
                {/* home btn - link */}
                <Link className="home-btn bg-orange-hover" to="https://www.jeftinekuce.com/" target="_blank">               
                    <img src={headerLogo} alt="portal-icon"/>
                </Link>

                {/* navbar (collapse) toggle btn */}
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavigation" aria-controls="navbarNavigation" aria-expanded="false" aria-label="Toggle navigation">
                    <IoReorderThreeOutline size={50} />
                </button>

                {/* navbar (collapse) container */}
                <div className="collapse navbar-collapse" id="navbarNavigation">
                    <ul className="navbar-nav ms-auto justify-content-around">
                        {appNavigationLinks.map(link => {
                            return <li className="nav-item" key={link.label}>
                                <NavLink to={link.href} className="fw-bold me-1">
                                    {link.label}
                                </NavLink>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar