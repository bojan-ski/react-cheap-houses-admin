import React from 'react'
import { useNavigate } from 'react-router-dom';
// api
import deleteUploadedImage from '../../api/deleteUploadedImage';
// toastify
import { toast } from 'react-toastify';
// firebase
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.config';


const DeleteBlogPost = ({ blogPostID, selectedBlogPost }) => {
    const navigate = useNavigate()

    const deleteBlogPost = async (blogPostID) => {
        if (window.confirm('Obriši Blog post?')) {
            try {
                // Delete each image if it exists
                const imageUrls = [
                    selectedBlogPost.newBlogPostImgOneUrl,
                    selectedBlogPost.newBlogPostImgTwoUrl,
                    selectedBlogPost.newBlogPostPromoImgOneUrl,
                    selectedBlogPost.newBlogPostPromoImgTwoUrl,
                ];

                for (const imageUrl of imageUrls) {
                    if (imageUrl) await deleteUploadedImage(imageUrl);
                }

                // delete listing from firebase
                await deleteDoc(doc(db, 'blogPosts', blogPostID))

                // success message after listing removal 
                toast.success('Uspešno ste obrisali Vaš oglas');

                //redirect user
                navigate('/blog')
            } catch (error) {
                //error message
                toast.error('Greška prilikom uklanjanja Blog post-a, molimo Vas probajte ponovo')
            }
        }
    }

    return (
        <button className='btn btn-danger fw-bold px-4 py-2 mb-3' onClick={() => deleteBlogPost(blogPostID)}>
            Ukloni Blog post
        </button>
    )
}

export default DeleteBlogPost