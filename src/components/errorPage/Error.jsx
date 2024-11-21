import React from 'react'
import { Link } from "react-router-dom";


const Error = ({ textOne, textTwo }) => {
    return (
        <div className="container error-page d-flex justify-content-center align-items-center">
            <div className="text-center">
                <h1 className="fw-bold mb-3">
                    {textOne}
                </h1>
                <h3 className="fw-bold text-muted mb-5">
                    {textTwo}
                </h3>
                <Link to='/' className="btn bg-orange-hover fw-bold fs-5 text-white p-3">
                    Nazad na početnu stranicu
                </Link>
            </div>
        </div>
    )
}

export default Error