import React from 'react'
// context
import { useGlobalContext } from '../../context';
// components
import ListingsFilterOptions from './ListingsFilterOptions';
import ListingsSearchOption from './ListingsSearchOption';
// react icons
import { FaFilter, FaSearch } from "react-icons/fa";


const SelectQueryOption = () => {
    const { adminSelectQueryOption, setAdminSelectQueryOption, fetchAllActiveListings, setUserQueryParameter, setDisableOption } = useGlobalContext()  
     
    const handleReset = () => {
        setDisableOption(false)

        setUserQueryParameter()

        fetchAllActiveListings()
    }

    return (
        <section className="pb-3 mb-4 border-bottom">
            <div className='mb-3'>
                <button type='button' className={adminSelectQueryOption == 'search' ? "layout-selected layout-btn btn text-muted me-2" : "layout-btn btn text-muted me-2"} onClick={() => setAdminSelectQueryOption('search')}>
                    <FaFilter size={18} />
                </button>
                <button type='button' className={adminSelectQueryOption == 'filter' ? "layout-selected layout-btn btn text-muted" : "layout-btn btn text-muted"} onClick={() => setAdminSelectQueryOption('filter')}>
                    <FaSearch size={18} />
                </button>
            </div>

            {adminSelectQueryOption == 'search' ? (
                <ListingsFilterOptions handleReset={handleReset} />
            ) : (
                <ListingsSearchOption handleReset={handleReset} />
            )}
        </section >
    )
}

export default SelectQueryOption