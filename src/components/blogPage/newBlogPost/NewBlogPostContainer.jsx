import React, { useState } from 'react'
// components
import FileInputImage from '../../FileInputImage';
import NewBlogPostForm from './NewBlogPostForm';
// toastify
import { toast } from 'react-toastify';


const NewBlogPostContainer = ({ customEntry }) => {
    const [uploadedImagesData, setUploadedImagesData] = useState({
        newBlogPostImgOne: null,
        newBlogPostImgTwo: null,
        newBlogPostPromoImgOne: null,
        newBlogPostPromoImgTwo: null,
    });

    const handleAddImage = (e, imageField) => {
        const { files } = e.target;

        if (files[0].size > import.meta.env.VITE_MAX_IMAGE_SIZE) {
            toast.error("Slika mora biti manja od 1MB.");
        } else {
            setUploadedImagesData((prevState) => ({
                ...prevState,
                [imageField]: files[0],
            }));
        }
    };

    const handleRemoveImage = (imageField) => {
        setUploadedImagesData((prevState) => ({
            ...prevState,
            [imageField]: null,
        }));
    };

    return (
        <section className='new-blog-post-form mx-3'>
            <div className='row'>

                {/* row item 1 */}
                <div className="col-2 mt-5 text-center">
                    {customEntry.promoOne && (
                        <FileInputImage
                            image={uploadedImagesData.newBlogPostPromoImgOne}
                            onMutate={(e) => handleAddImage(e, 'newBlogPostPromoImgOne')}
                            inputId="newBlogPostPromoImgOne"
                            handleRemoveImage={handleRemoveImage}
                            className="img-fluid"
                            height='580px'
                        />
                    )}
                </div>

                {/* row item 2 */}
                <div className="col-8">
                    <NewBlogPostForm customEntry={customEntry} uploadedImagesData={uploadedImagesData} handleAddImage={handleAddImage} handleRemoveImage={handleRemoveImage} />
                </div>

                {/* row item 3 */}
                <div className="col-2 mt-5 text-center">
                    {customEntry.promoTwo && (
                        <FileInputImage
                            image={uploadedImagesData.newBlogPostPromoImgTwo}
                            onMutate={(e) => handleAddImage(e, 'newBlogPostPromoImgTwo')}
                            inputId="newBlogPostPromoImgTwo"
                            handleRemoveImage={handleRemoveImage}
                            className="img-fluid"
                            height='580px'
                        />
                    )}
                </div>
            </div >
        </section >
    )
}

export default NewBlogPostContainer