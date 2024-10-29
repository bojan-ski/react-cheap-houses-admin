import { useState } from 'react'
// context
import { useGlobalContext } from '../../context'
// components
import FileInputImage from '../FileInputImage'
import FormTextArea from '../FormTextArea'


const NewBlogPostForm = ({ customEntry }) => {
    console.log(customEntry);
    
    const { userData } = useGlobalContext()

    const [uploadedImagesData, setUploadedImagesData] = useState({
        newBlogPostImgOne: null,
        newBlogPostImgTwo: null,
    });

    const onMutate = (e, imageField) => {
        const { files } = e.target;
        setUploadedImagesData((prevState) => ({
            ...prevState,
            [imageField]: files[0],
        }));
    };

    return (
        <section className='new-blog-post-form'>
            <div className='container'>

                <form className="text-center">
                    <input
                        className="input"
                        type="text"
                        name='newBlogPostTitle'
                        placeholder='Title'
                        required={true}
                        maxLength={50}
                    />

                    <div className="row mb-5">
                        {/* ROW ITEM ONE */}
                        {customEntry.imageOne ? (
                            <>
                                {/* new blog post - content 1 */}
                                <div className="col-6">
                                    <FormTextArea
                                        name="newBlogPostContentOne"
                                        rows={27}
                                        minLength={10}
                                        maxLength={2000}
                                        required={true}
                                    />
                                </div>

                                {/* new blog post - img 1 */}
                                <div className="col-6">
                                    <FileInputImage
                                        image={uploadedImagesData.newBlogPostImgOne}
                                        onMutate={(e) => onMutate(e, 'newBlogPostImgOne')}
                                        inputId="newBlogPostImgOne"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                {/* new blog post - content 1 */}
                                <div className="col-12">
                                    <FormTextArea
                                        name="newBlogPostContentOne"
                                        rows={15}
                                        minLength={10}
                                        maxLength={2000}
                                        required={true}
                                    />
                                </div>
                            </>
                        )}


                        {/* ROW ITEM TWO */}
                        {(customEntry.imageTwo || customEntry.postContentTwo) && (
                            <>
                                {(customEntry.postContentTwo && !customEntry.imageTwo) && (
                                    <>
                                        {/* new blog post - content 2 */}
                                        <div className="col-12">
                                            <FormTextArea
                                                name="newBlogPostContentTwo"
                                                rows={15}
                                                minLength={10}
                                                maxLength={2000}
                                                required={false}
                                            />
                                        </div>
                                    </>
                                )}

                                {(customEntry.imageTwo && !customEntry.postContentTwo) && (
                                    <>
                                        {/* new blog post - img 2 */}
                                        <div className="col-12">
                                            <FileInputImage
                                                image={uploadedImagesData.newBlogPostImgTwo}
                                                onMutate={(e) => onMutate(e, 'newBlogPostImgTwo')}
                                                inputId="newBlogPostImgTwo"
                                            />
                                        </div>
                                    </>
                                )}

                                {(customEntry.imageTwo && customEntry.postContentTwo) && (
                                    <>
                                        {/* new blog post - img 2 */}
                                        <div className="col-6">
                                            <FileInputImage
                                                image={uploadedImagesData.newBlogPostImgTwo}
                                                onMutate={(e) => onMutate(e, 'newBlogPostImgTwo')}
                                                inputId="newBlogPostImgTwo"
                                            />
                                        </div>

                                        {/* new blog post - content 2 */}
                                        <div className="col-6">
                                            <FormTextArea
                                                name="newBlogPostContentTwo"
                                                rows={27}
                                                minLength={10}
                                                maxLength={2000}
                                                required={false}
                                            />
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                    </div>


                    {/* SUBMIT BTN */}
                    <button type="submit" className="btn bg-orange-hover">
                        Submit
                    </button>
                </form>
            </div >
        </section >
    )
}

export default NewBlogPostForm