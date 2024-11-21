import React from "react"
// toastify
import { toast } from "react-toastify"


const SearchOption = ({ searchTerm, setSearchTerm, disableOption, setDisableOption, fetchSearchResults, placeholderText }) => {

    const handleSearchTerm = e => {
        e.preventDefault()

        if (searchTerm == '' || searchTerm.trim().length == 0) return toast.warning(`Uneste validan naziv ${placeholderText}`)

        setDisableOption(true)

        fetchSearchResults(0, searchTerm.trim())
    }

    const handleReset = () => {
        setDisableOption(false)

        setSearchTerm('')

        fetchSearchResults()
    }

    return (
        <section className="search-option mb-3">
            <form onSubmit={handleSearchTerm}>
                <div className="row">

                    {/* row item 1 */}
                    <div className="col-12 col-md-9 mb-3">
                        <input type="text" className="form-control" value={searchTerm} placeholder={`Unesite naziv ${placeholderText}`} onChange={e => setSearchTerm(e.target.value)} disabled={disableOption} />
                    </div>

                    {/* row item 2 */}
                    {!disableOption && (
                        <div className="col-12 col-md-3 mb-3">
                            <button type="submit" className="btn bg-orange-hover fw-bold text-white w-100">
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
        </section>
    )
}

export default SearchOption