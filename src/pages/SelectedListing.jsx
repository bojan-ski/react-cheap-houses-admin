import { useState } from "react";
import { useLoaderData } from "react-router-dom"
// api funcs
import fetchSelectedListingDetailsFromFirebase from '../api/fetchSelectedListingDetailsFromFirebase.js'
// component
import BackButton from "../components/BackButton.jsx";
import AccountDetails from "../components/selectedListingPage/AccountDetails.jsx";
import ListingType from "../components/selectedListingPage/ListingType.jsx";
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

    const [imageSrc, setImageSrc] = useState('')

    const urlBackPath = `/${window.location.pathname.split('/')[1]}`

    return (
        <>
            <div className="selected-listing-page my-5">
                <div className="container px-5 rounded-4 border bg-white">

                    <div className="my-5">
                        <BackButton backPath={urlBackPath} />
                    </div>

                    <section className="mb-4 pb-2 border-bottom">
                        <AccountDetails />
                    </section>

                    <section className="mb-5 text-center">
                        <ListingType selectedListingDetails={selectedListingDetails} />
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
                                <ImagesGallery imageUrls={selectedListingDetails.imageUrls} setImageSrc={setImageSrc} />

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