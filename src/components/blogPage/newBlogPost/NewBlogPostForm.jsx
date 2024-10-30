import { useState } from "react"
import { useNavigate } from "react-router-dom"
// api
import storeUploadedImage from "../../../api/storeUploadedImage"
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


const NewBlogPostForm = ({ customEntry, uploadedImagesData, handleImageMutate }) => {
    const navigate = useNavigate()

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
        const newBlogPostContentTwo = textFormData.newBlogPostContentTwo;

        const currentDate = getCurrentDate()

        let newBlogPostImgOneUrl;
        let newBlogPostImgTwoUrl;
        let newBlogPostPromoImgOneUrl;
        let newBlogPostPromoImgTwoUrl;

        if (uploadedImagesData.newBlogPostImgOne
            && uploadedImagesData.newBlogPostImgOne.name != 'undefined' && uploadedImagesData.newBlogPostImgOne.size < 1000000) {
            try {
                newBlogPostImgOneUrl = await storeUploadedImage('blogPostImages', uploadedImagesData.newBlogPostImgOne, newBlogPostTitle, currentDate)
            } catch (error) {
                // error message 
                console.log('Error image - one')
                console.log(error)
            }
        }

        if (uploadedImagesData.newBlogPostImgTwo && uploadedImagesData.newBlogPostImgTwo.name != 'undefined' && uploadedImagesData.newBlogPostImgTwo.size < 1000000) {
            try {
                newBlogPostImgTwoUrl = await storeUploadedImage('blogPostImages', uploadedImagesData.newBlogPostImgTwo, newBlogPostTitle, currentDate)
            } catch (error) {
                // error message
                console.log('Error image - two')
                console.log(error)
            }
        }


        if (uploadedImagesData.newBlogPostPromoImgOne
            && uploadedImagesData.newBlogPostPromoImgOne.name != 'undefined' && uploadedImagesData.newBlogPostPromoImgOne.size < 1000000) {
            try {
                newBlogPostPromoImgOneUrl = await storeUploadedImage('blogPostImages', uploadedImagesData.newBlogPostPromoImgOne, newBlogPostTitle, currentDate)
            } catch (error) {
                // error message 
                console.log('Error promo image - one')
                console.log(error)
            }
        }

        if (uploadedImagesData.newBlogPostPromoImgTwo && uploadedImagesData.newBlogPostPromoImgTwo.name != 'undefined' && uploadedImagesData.newBlogPostPromoImgTwo.size < 1000000) {
            try {
                newBlogPostPromoImgTwoUrl = await storeUploadedImage('blogPostImages', uploadedImagesData.newBlogPostPromoImgTwo, newBlogPostTitle, currentDate)
            } catch (error) {
                // error message
                console.log('Error promo image - two')
                console.log(error)
            }
        }

        const newBlogPostData = {
            newBlogPostTitle,
            newBlogPostContentOne,
            newBlogPostContentTwo: newBlogPostContentTwo.length > 0 ? newBlogPostContentTwo : null,
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

            // redirect user
            // setTimeout(() => navigate('/blog'), 1500)
            // setTimeout(() => window.location.href = '/blog', 1500)
        }

        setIsLoading(false)
    }

    // console.log(textFormData);    

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
                    <>
                        {/* new blog post - content 1 */}
                        <div className="col-6">
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
                        <div className="col-6">
                            <FileInputImage
                                image={uploadedImagesData.newBlogPostImgOne}
                                onMutate={(e) => handleImageMutate(e, 'newBlogPostImgOne')}
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
                                maxLength={1500}
                                required={true}
                                onMutate={handleTextMutate}
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
                                        onMutate={(e) => handleImageMutate(e, 'newBlogPostImgTwo')}
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
                                        onMutate={(e) => handleImageMutate(e, 'newBlogPostImgTwo')}
                                        inputId="newBlogPostImgTwo"
                                    />
                                </div>

                                {/* new blog post - content 2 */}
                                <div className="col-6">
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
                    </>
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