const NewBlogPostCustomization = ({ setCustomEntry }) => {
    return (
        <div className="container">
            <div className="row mb-3">
                
                {/* row item 1 */}
                <div className="col-12 col-xl-6 mb-4">
                    <h5 className="mb-3">
                        Prilagodi Blog post:
                    </h5>

                    <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="imageOne" autoComplete="off" onChange={e => setCustomEntry(curState => ({
                            ...curState, imageOne: e.target.checked
                        }))} />
                        <label className="btn btn-outline-warning" htmlFor="imageOne">
                            Dodaj sliku - 1MB max
                        </label>

                        <input type="checkbox" className="btn-check" id="postContentTwo" autoComplete="off" onChange={e => setCustomEntry(curState => ({
                            ...curState, postContentTwo: e.target.checked
                        }))} />
                        <label className="btn btn-outline-warning" htmlFor="postContentTwo">
                            Dodaj novo polje
                        </label>

                        <input type="checkbox" className="btn-check" id="imageTwo" autoComplete="off" onChange={e => setCustomEntry(curState => ({
                            ...curState, imageTwo: e.target.checked
                        }))} />
                        <label className="btn btn-outline-warning" htmlFor="imageTwo">
                            Dodaj sliku - 1MB max
                        </label>
                    </div>
                </div>

                {/* row item 2 */}
                <div className="col-12 col-xl-6 mb-4">
                    <h5 className="mb-3">
                        Promotivni materijal:
                    </h5>

                    <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="promoOne" autoComplete="off" onChange={e => setCustomEntry(curState => ({
                            ...curState, promoOne: e.target.checked
                        }))} />
                        <label className="btn btn-outline-warning" htmlFor="promoOne">
                            Dodaj sliku - 1MB max
                        </label>

                        <input type="checkbox" className="btn-check" id="promoTwo" autoComplete="off" onChange={e => setCustomEntry(curState => ({
                            ...curState, promoTwo: e.target.checked
                        }))} />
                        <label className="btn btn-outline-warning" htmlFor="promoTwo">
                            Dodaj sliku - 1MB max
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewBlogPostCustomization