import React from 'react'
// context
import { useGlobalContext } from '../../context'
// data
import propertyTypes from '../../data/propertyTypes'
import districts from '../../data/districts'


const FilterOptions = () => {
    const { userQueryParameter, setUserQueryParameter, disableOption } = useGlobalContext()

    const propertyTypesList = ['Svi tipovi imovine', ...propertyTypes]
    const districtsList = ['Svi okruzi', ...districts]

    const handleSelectedFilterOption = e => {
        setUserQueryParameter(curState => ({
            ...curState,
            [e.target.id]: e.target.value
        }))
    }

    return (
        <>
            {/* row item 1 - display selected offer type */}
            <div className="col-12 col-md-3 mb-3">
                <select className="form-select" value={typeof userQueryParameter == 'object' && userQueryParameter.selectedListingType} id="selectedListingType" onChange={handleSelectedFilterOption} disabled={disableOption}>
                    <option value="Svi oglasi">Svi oglasi</option>
                    <option value="prodajem">Na prodaju</option>
                    <option value="izdajem">Izdaje se</option>
                </select>
            </div>

            {/* row item 2 - display selected property type */}
            <div className="col-12 col-md-3 mb-3">
                <select className="form-select" value={typeof userQueryParameter == 'object' && userQueryParameter.selectedPropertyType} id="selectedPropertyType" onChange={handleSelectedFilterOption} disabled={disableOption}>
                    {propertyTypesList.map((propertyType, idx) => {
                        return <option key={idx} value={propertyType} className="capitalize">
                            {propertyType}
                        </option>
                    })}
                </select>
            </div>

            {/* row item 3 - display selected district */}
            <div className="col-12 col-md-3 mb-3">
                <select className="form-select" value={typeof userQueryParameter == 'object' && userQueryParameter.selectedDistrict} id="selectedDistrict" onChange={handleSelectedFilterOption} disabled={disableOption}>
                    {districtsList.map((district, idx) => {
                        return <option key={idx} value={district} className="capitalize">
                            {district}
                        </option>
                    })}
                </select>
            </div>
        </>
    )
}

export default FilterOptions