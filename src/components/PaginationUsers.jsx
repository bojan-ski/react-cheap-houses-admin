import React from 'react'
// utils func
import scrollToTop from "../utils/scrollToTop";
// components
import PaginationUI from './PaginationUI';


const PaginationUsers = ({ fetchData, userID, page, isLoading }) => {
    const handleNextPage = () => {
        fetchData(page + 1, userID);
        scrollToTop()
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            fetchData(page - 1, userID);
            scrollToTop()
        }
    };

    return <PaginationUI page={page} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} isLoading={isLoading}/>
}

export default PaginationUsers