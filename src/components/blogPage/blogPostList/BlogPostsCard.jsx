import React from 'react'
import { Link } from "react-router-dom";
// utils
import scrollToTop from '../../../utils/scrollToTop';
// assets
import noImg from '../../../assets/blog-posts-assets/no-available-img.png';


const BlogPostsCard = ({ blogPost }) => {
    const { blogPostID, blogPostData } = blogPost;
    const { newBlogPostImgOneUrl, newBlogPostTitle, newBlogPostCreated } = blogPostData;
   
    return (
        <div className="col-12 col-lg-6 col-xl-4 p-3">
            <div className="blog-post-card bg-white rounded-4 p-4">
                <div className="blog-post-card-main border-bottom pb-3 mb-3">
                    <div className='blog-post-card-img-container mb-3'>
                        <img src={newBlogPostImgOneUrl ? newBlogPostImgOneUrl : noImg} alt="blog-post-img" className="rounded-4" />
                    </div>
                    <h3 className="text-center">
                        {newBlogPostTitle}
                    </h3>
                </div>

                <div className="blog-post-card-footer d-flex align-items-center justify-content-between">
                    <Link to={`/blog/${blogPostID}`} className="btn bg-orange-hover text-white fw-bold py-2 px-3" onClick={() => scrollToTop()}>
                        Pročitaj više
                    </Link>
                    <p className="fw-bold mb-0">
                        {newBlogPostCreated}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BlogPostsCard