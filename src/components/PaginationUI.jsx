import React from 'react'
// React Icons
import { GrNext, GrPrevious } from "react-icons/gr"


const PaginationUI = ({ page, handlePreviousPage, handleNextPage, isLoading }) => {
    return (
        < section className="pagination d-flex align-items-center justify-content-between">
            <p className="fw-bold text-muted mb-0 fs-5">
                Stranica:
                <span className="text-dark ms-2">
                    {page + 1}
                </span>
            </p>

            <div className="pagination-btn-container">
                <button className="btn px-3 me-3 btn-prev" onClick={handlePreviousPage} disabled={page === 0 || isLoading}>
                    <GrPrevious className="text-white" />
                </button>
                <button className="btn px-3 btn-next" onClick={handleNextPage} disabled={isLoading}>
                    <GrNext className="text-white" />
                </button>
            </div>
        </section >
    )
}

export default PaginationUI