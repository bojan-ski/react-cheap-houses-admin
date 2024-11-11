import React from 'react'
// context
import { useGlobalContext } from '../../context';


const ListingsSearchOption = ({ handleReset }) => {
  const { fetchAllActiveListings, userQueryParameter, setUserQueryParameter, disableOption, setDisableOption } = useGlobalContext()

  const handleListingSearch = e => {
    e.preventDefault()

    if (userQueryParameter == undefined || userQueryParameter.trim().length == 0) return

    setDisableOption(true)

    fetchAllActiveListings(0, userQueryParameter.trim())
  }

  return (
    <form onSubmit={handleListingSearch}>
      <div className="row">

        {/* row item 1 */}
        <div className="col-12 col-md-9 mb-3">
          <input type="text" className="form-control" value={typeof userQueryParameter == 'string' ? userQueryParameter : ''} placeholder="Unesite naziv mesta" onChange={e => setUserQueryParameter(e.target.value)} disabled={disableOption} />
        </div>

        {/* row item 2 */}
        {!disableOption && (
          <div className="col-12 col-md-3 mb-3">
            <button type="submit" className="fw-bold btn bg-orange-hover text-white w-100">
              Primeni
            </button>
          </div>
        )}

        {disableOption && (
          <div className="col-12 col-md-3 mb-3">
            <button type="button" className="fw-bold btn btn-warning w-100 text-white" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </form>
  )
}

export default ListingsSearchOption