import React, { useState } from 'react'
// components
import FileInputImage from '../../FileInputImage';
import NewBlogPostForm from './NewBlogPostForm';


const NewBlogPostContainer = ({ customEntry }) => {
    const [uploadedImagesData, setUploadedImagesData] = useState({
        newBlogPostImgOne: null,
        newBlogPostImgTwo: null,
        newBlogPostPromoImgOne: null,
        newBlogPostPromoImgTwo: null,
    });

    const handleImageMutate = (e, imageField) => {
        const { files } = e.target;
        setUploadedImagesData((prevState) => ({
            ...prevState,
            [imageField]: files[0],
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
                            onMutate={(e) => handleImageMutate(e, 'newBlogPostPromoImgOne')}
                            inputId="newBlogPostPromoImgOne"
                        />
                    )}
                </div>

                {/* row item 2 */}
                <div className="col-8">
                    <NewBlogPostForm customEntry={customEntry} uploadedImagesData={uploadedImagesData} handleImageMutate={handleImageMutate}/>
                </div>

                {/* row item 3 */}
                <div className="col-2 mt-5 text-center">
                    {customEntry.promoTwo && (
                        <FileInputImage
                            image={uploadedImagesData.newBlogPostPromoImgTwo}
                            onMutate={(e) => handleImageMutate(e, 'newBlogPostPromoImgTwo')}
                            inputId="newBlogPostPromoImgTwo"
                        />
                    )}
                </div>
            </div >
        </section >
    )
}

export default NewBlogPostContainer