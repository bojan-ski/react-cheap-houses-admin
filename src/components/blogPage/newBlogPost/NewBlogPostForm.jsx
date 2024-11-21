import React, { useState } from "react"
// context
import { useGlobalContext } from "../../../context"
// api
import checkIfImageIsValid from "../../../api/checkIfImageIsValid"
import postNewBlogPost from "../../../api/postNewBlogPost"
// firebase
import { serverTimestamp } from "firebase/firestore"
// utils
import getCurrentDate from "../../../utils/getCurrentDate"
// components
import FileInputImage from "../../FileInputImage"
import FormTextArea from "../../FormTextArea"
// toastify
import { toast } from "react-toastify"


const NewBlogPostForm = ({ customEntry, uploadedImagesData, handleAddImage, handleRemoveImage }) => {
    const { setSelectedContent, fetchBlogPosts } = useGlobalContext()

    const [isLoading, setIsLoading] = useState(false)
    const [textFormData, setTextFormData] = useState({
        newBlogPostTitle: '',
        newBlogPostContentOne: '',
        newBlogPostContentTwo: '',
    })

    const handleTextMutate = (e) => {
        if (!e.target.files) {
            setTextFormData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }
    }

    const handlePostNewBlogPost = async e => {
        e.preventDefault()

        setIsLoading(true)

        const newBlogPostTitle = textFormData.newBlogPostTitle;
        const newBlogPostContentOne = textFormData.newBlogPostContentOne;
        const newBlogPostContentTwo = textFormData.newBlogPostContentTwo.length > 0 ? textFormData.newBlogPostContentTwo : null;

        const currentDate = getCurrentDate()

        const newBlogPostImgOneUrl = await checkIfImageIsValid('blogPostImages', uploadedImagesData.newBlogPostImgOne, newBlogPostTitle, currentDate);
        const newBlogPostImgTwoUrl = await checkIfImageIsValid('blogPostImages', uploadedImagesData.newBlogPostImgTwo, newBlogPostTitle, currentDate);
        const newBlogPostPromoImgOneUrl = await checkIfImageIsValid('blogPostImages', uploadedImagesData.newBlogPostPromoImgOne, newBlogPostTitle, currentDate);
        const newBlogPostPromoImgTwoUrl = await checkIfImageIsValid('blogPostImages', uploadedImagesData.newBlogPostPromoImgTwo, newBlogPostTitle, currentDate);

        const newBlogPostData = {
            newBlogPostTitle,
            newBlogPostContentOne,
            newBlogPostContentTwo,
            newBlogPostImgOneUrl: newBlogPostImgOneUrl ? newBlogPostImgOneUrl : null,
            newBlogPostImgTwoUrl: newBlogPostImgTwoUrl ? newBlogPostImgTwoUrl : null,
            newBlogPostPromoImgOneUrl: newBlogPostPromoImgOneUrl ? newBlogPostPromoImgOneUrl : null,
            newBlogPostPromoImgTwoUrl: newBlogPostPromoImgTwoUrl ? newBlogPostPromoImgTwoUrl : null,
            newBlogPostCreated: currentDate,
            timestamp: serverTimestamp()
        }

        const response = await postNewBlogPost(newBlogPostData)

        if (response) {
            // success message
            toast.success('Uspešno ste objavili novi Blog post.')

            // re-fetch blog posts
            await fetchBlogPosts()

            // redirect user
            setTimeout(() => setSelectedContent('blogs'), 2000)
        }

        setIsLoading(false)
    }

    return (
        <form className="text-center bg-white rounded-5 p-5" onSubmit={handlePostNewBlogPost}>
            <input
                className="form-control w-50 mx-auto mb-4"
                type="text"
                name='newBlogPostTitle'
                placeholder='Naziv Blog-a'
                required={true}
                maxLength={50}
                onChange={handleTextMutate}
            />

            <div className="row mb-5">
                {/* ROW ITEM ONE */}
                {customEntry.imageOne ? (
                    <div className="row">
                        {/* new blog post - content 1 */}
                        <div className="col-12 col-xl-6">
                            <FormTextArea
                                name="newBlogPostContentOne"
                                rows={27}
                                minLength={10}
                                maxLength={1500}
                                required={true}
                                onMutate={handleTextMutate}
                            />
                        </div>

                        {/* new blog post - img 1 */}
                        <div className="col-12 col-xl-6">
                            <FileInputImage
                                image={uploadedImagesData.newBlogPostImgOne}
                                onMutate={(e) => handleAddImage(e, 'newBlogPostImgOne')}
                                inputId="newBlogPostImgOne"
                                handleRemoveImage={handleRemoveImage}
                                className="img-fluid"
                                height='580px'
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        {/* new blog post - content 1 */}
                        <div className="col-12">
                            <FormTextArea
                                name="newBlogPostContentOne"
                                rows={15}
                                minLength={10}
                                maxLength={1500}
                                required={true}
                                onMutate={handleTextMutate}
                            />
                        </div>
                    </>
                )}

                {/* ROW ITEM TWO */}
                {(customEntry.imageTwo || customEntry.postContentTwo) && (
                    <div className="row">
                        {(customEntry.postContentTwo && !customEntry.imageTwo) && (
                            <>
                                {/* new blog post - content 2 */}
                                <div className="col-12">
                                    <FormTextArea
                                        name="newBlogPostContentTwo"
                                        rows={15}
                                        minLength={10}
                                        maxLength={1500}
                                        required={false}
                                        onMutate={handleTextMutate}
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
                                        onMutate={(e) => handleAddImage(e, 'newBlogPostImgTwo')}
                                        inputId="newBlogPostImgTwo"
                                        handleRemoveImage={handleRemoveImage}
                                        className="img-fluid"
                                        height='580px'
                                    />
                                </div>
                            </>
                        )}

                        {(customEntry.imageTwo && customEntry.postContentTwo) && (
                            <>
                                {/* new blog post - img 2 */}
                                <div className="col-12 col-xl-6 order-2 order-xl-1">
                                    <FileInputImage
                                        image={uploadedImagesData.newBlogPostImgTwo}
                                        onMutate={(e) => handleAddImage(e, 'newBlogPostImgTwo')}
                                        inputId="newBlogPostImgTwo"
                                        handleRemoveImage={handleRemoveImage}
                                        className="img-fluid"
                                        height='580px'
                                    />
                                </div>

                                {/* new blog post - content 2 */}
                                <div className="col-12 col-xl-6 order-1 order-xl-2">
                                    <FormTextArea
                                        name="newBlogPostContentTwo"
                                        rows={27}
                                        minLength={10}
                                        maxLength={1500}
                                        required={false}
                                        onMutate={handleTextMutate}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* SUBMIT BTN */}
            <button type="submit" className="btn bg-orange-hover fw-bold text-white py-3 px-5" disabled={isLoading}>
                Objavi novi Blog post
            </button>
        </form>
    )
}

export default NewBlogPostForm