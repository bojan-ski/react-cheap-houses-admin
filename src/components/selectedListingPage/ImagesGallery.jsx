import React from 'react'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';


const ImagesGallery = ({ imageUrls, setImageSrc }) => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                loop={true}
                effect={'fade'}
                modules={[EffectFade, Navigation, Pagination]}
                navigation={true}
                pagination={{
                    dynamicBullets: true,
                }}
                className="images-gallery rounded-5"
            >
                {imageUrls.map((image, idx) => {
                    return <SwiperSlide key={idx} >
                        <img src={image} data-bs-toggle="modal" data-bs-target="#selectedImageModal" onClick={() => setImageSrc(image)} />
                    </SwiperSlide>
                })}
            </Swiper>
        </>
    )
}

export default ImagesGallery