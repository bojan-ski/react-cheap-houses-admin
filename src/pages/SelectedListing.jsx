import { useState } from "react";
import { useLoaderData } from "react-router-dom"
// api funcs
import fetchSelectedListingDetailsFromFirebase from '../api/fetchSelectedListingDetailsFromFirebase.js'
// utils funcs
import priceComma from "../utils/priceComma.js";
// component
import BackButton from "../components/BackButton.jsx";
import ListingDetailsItemOne from "../components/selectedListingPage/ListingDetailsItemOne.jsx";
import ListingDetailsItemTwo from "../components/selectedListingPage/ListingDetailsItemTwo.jsx";
import ListingDetailsItemThree from "../components/selectedListingPage/ListingDetailsItemThree.jsx";
import ListingDetailsItemFour from "../components/selectedListingPage/ListingDetailsItemFour.jsx";
import ImagesGallery from "../components/selectedListingPage/ImagesGallery.jsx";
// modal
import SelectedImageModal from "../modals/SelectedImageModal.jsx";


// LOADER
export const loader = async ({ params }) => {
    const selectedListingDetails = await fetchSelectedListingDetailsFromFirebase(params.id)

    return selectedListingDetails
}

const SelectedListing = () => {
    const selectedListingDetails = useLoaderData()    

    const { listingType, propertyType, propertyName, numRooms, numBathrooms, lotNumber, squareFootage, propertyAddress, propertyLocation, propertyDistrict, imageUrls, askingPrice, listingDescription, listingCreated, contactFullName, contactPhoneNumber, contactEmailAddress } = selectedListingDetails

    const [imageSrc, setImageSrc] = useState('')   

    const urlBackPath = `/${window.location.pathname.split('/')[1]}`    

    return (
        <>
            <div className="selected-listing-page my-5">
                <div className="container px-5 rounded-4 border bg-white">

                    <section className="d-flex align-items-center justify-content-between my-5">
                        <BackButton backPath={urlBackPath} />

                        <h2 className="text-orange fw-bold">
                            {listingType === 'izdajem' ? "IZDAJE SE" : 'NA PRODAJU'}
                        </h2>
                    </section>

                    <section className="mb-5 text-center">
                        <h4 className="text-muted fw-bold capitalize">
                            {propertyType}
                        </h4>
                        <h3 className="fw-bold capitalize mb-3">
                            {propertyName}
                        </h3>
                        <h4 className="text-orange fw-bold">
                            {priceComma(askingPrice)} EUR {listingType === 'izdajem' ? 'mesečno' : ''}
                        </h4>
                    </section>

                    <section>
                        <div className="row">

                            {/* row item 1 */}
                            <div className="col-12 col-lg-6 mb-4">
                                <ListingDetailsItemOne selectedListingDetails={selectedListingDetails} />
                            </div>

                            {/* row item 2 */}
                            <div className="col-12 col-lg-6 mb-4">
                                <ListingDetailsItemTwo selectedListingDetails={selectedListingDetails} />
                            </div>

                            {/* row item 3 */}
                            <div className="col-12 pb-4 mb-4 border-bottom">
                                <ListingDetailsItemThree selectedListingDetails={selectedListingDetails} />
                            </div>

                            {/* row item 4 */}
                            <div className="col-12 pb-4 mb-4 border-bottom">
                                <ListingDetailsItemFour selectedListingDetails={selectedListingDetails} />
                            </div>

                            {/* row item 5 */}
                            <div className="col-12 mb-4">
                                <h6 className="text-center text-muted mb-3">
                                    Kliknite na sliku radi bolje preglednosti
                                </h6>

                                {/* ImgsGallery - component */}
                                <ImagesGallery imageUrls={imageUrls} setImageSrc={setImageSrc} />

                                {/* SelectedImageModal - modal */}
                                <SelectedImageModal imageSrc={imageSrc} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default SelectedListing