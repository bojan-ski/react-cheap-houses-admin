import React from 'react'
// utils func
import scrollToTop from "../utils/scrollToTop";
// components
import PaginationUI from './PaginationUI';


const Pagination = ({ fetchData, page, queryParam, isLoading }) => {
    const handleNextPage = () => {
        queryParam ? fetchData(page + 1, queryParam) : fetchData(page + 1);
        scrollToTop()
    };

    const handlePreviousPage = () => {
        scrollToTop()
        
        if (page > 0) {
            queryParam ? fetchData(page - 1, queryParam) : fetchData(page - 1);
        }
    };

    return <PaginationUI page={page} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} isLoading={isLoading}/>
}

export default Pagination