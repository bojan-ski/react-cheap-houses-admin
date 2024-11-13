import React from 'react'
import { Link } from 'react-router-dom'


const BackButton = () => {
    const backPath = window.location.pathname.split('/')[3] ?
        `${window.location.pathname.split('/')[1]}/${window.location.pathname.split('/')[2]}` :
        window.location.pathname.split('/')[1]

    // console.log(backPath);    

    return (
        <Link to={`/${backPath}`} className="btn bg-orange-hover text-white fw-bold px-4 py-2 mb-3">
            Nazad
        </Link>
    )
}

export default BackButton