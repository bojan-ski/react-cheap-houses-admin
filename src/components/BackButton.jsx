import React from 'react'
import { Link } from 'react-router-dom'
// utils
import backPathUrl from '../utils/backPathUrl'


const BackButton = () => {
    const backPath = backPathUrl()

    return (
        <Link to={`/${backPath}`} className="btn bg-orange-hover text-white fw-bold px-4 py-2 mb-3">
            Nazad
        </Link>
    )
}

export default BackButton