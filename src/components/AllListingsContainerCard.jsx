import React from 'react'
import { Link } from "react-router-dom"
// utils func
import priceComma from '../utils/priceComma.js';
import scrollToTop from '../utils/scrollToTop.js';
// React Icons
import { LiaTapeSolid } from 'react-icons/lia'
import { MdConfirmationNumber, MdOutlineBedroomChild } from 'react-icons/md'
import { PiBathtubLight } from 'react-icons/pi'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';


const AllListingsContainerCard = ({ listing }) => {
    const { listingType, propertyType, propertyName, numRooms, numBathrooms, lotNumber, squareFootage, propertyLocation, propertyDistrict, imageUrls, askingPrice, listingCreated } = listing.data

    const pathname = window.location.pathname
    // console.log(pathname);    

    return (
        <div className="listings-card col-12 col-lg-4 p-1 text-center text-lg-start">
            <div className="listings-card-details">

                <h4 className="text-orange text-center fw-bold mb-4">
                    {listingType === 'izdajem' ? "IZDAJE SE" : 'NA PRODAJU'}
                </h4>

                <div className="listings-card-details-images d-flex mb-3">
                    <Swiper
                        slidesPerView={1}
                        modules={[Pagination, Navigation]}
                        navigation={true}
                        pagination={{
                            dynamicBullets: true,
                        }}
                    >
                        {imageUrls.slice(0, 3)?.map((image, idx) => {
                            return (
                                <SwiperSlide key={idx} className="text-center listings-card-details-image">
                                    <img src={image} alt="slike-imovine" className="rounded-4" />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <div className="images-overlay"></div>
                </div>

                <div className="listings-card-details-header">
                    <h5 className="capitalize fw-bold text-orange">
                        {propertyType}
                    </h5>
                    <h6 className="capitalize">
                        {propertyName}
                    </h6>
                </div>

                <div className={listingType === 'izdajem' ? 'listings-card-details-info row border-bottom pb-3 mb-3' : 'listings-card-details-info row border-bottom pb-4 mb-4 pb-lg-3 mb-lg-3'}>
                    <div className="col-12">
                        <h6 className="text-muted">
                            Mesto:<span className="ms-1 text-dark capitalize">{propertyLocation}</span>
                        </h6>
                        <h6 className="text-muted">
                            Okrug:<span className="ms-1 text-dark capitalize">{propertyDistrict}</span>
                        </h6>
                        <h6 className="text-orange fw-bold">
                            {priceComma(askingPrice)} EUR {listingType === 'izdajem' ? 'mesečno' : ''}
                        </h6>
                    </div>
                    <div className="col-12 d-flex flex-row flex-lg-column justify-content-center">
                        {propertyType === 'plac' ? (
                            <>
                                <p className="mb-0 d-flex align-items-center me-4" >
                                    <MdConfirmationNumber className='me-2' />
                                    Broj parcele:<span className="ms-1 fw-bold text-dark">{lotNumber}</span>
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="mb-0 d-flex align-items-center me-4" >
                                    <MdOutlineBedroomChild className='me-2' />
                                    Sobe:<span className="ms-1 fw-bold text-dark">{numRooms}</span>
                                </p>
                                <p className="mb-0 d-flex align-items-center me-4">
                                    <PiBathtubLight className='me-2' />
                                    Kupatila:<span className="ms-1 fw-bold text-dark">{numBathrooms}</span>
                                </p>
                            </>
                        )}
                        <p className={propertyType === 'plac' ? "d-flex align-items-center mb-0 mb-lg-4" : "d-flex align-items-center mb-0"}>
                            <LiaTapeSolid className='me-2' />
                            Prostor:
                            <span className="ms-1 fw-bold text-dark">
                                {squareFootage}
                            </span>
                            <span className="ms-1 fw-bold text-dark">
                                {propertyType == 'plac' ? 'ari' : 'kv.'}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <Link to={`${pathname}/${listing.id}`} className="btn bg-orange-hover text-white fw-bold px-4" onClick={() => scrollToTop()}>
                        Detailji
                    </Link>

                    <p className="fw-bold mb-0">
                        {listingCreated.split('-')[1]}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AllListingsContainerCard