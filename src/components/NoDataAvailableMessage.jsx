import React from 'react'

const NoDataAvailableMessage = ({ text }) => {
    return (
        <div className="text-center py-5">
            <h1 className="fw-bold">
                Trenutno nema postavljenih {text}
            </h1>
        </div>
    )
}

export default NoDataAvailableMessage