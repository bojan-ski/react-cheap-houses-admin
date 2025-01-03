import React from 'react'
import { useLoaderData } from "react-router-dom";
// api func
import fetchSelectedDataFromFirebase from "../api/fetchSelectedDataFromFirebase";
//components
import BlogPostOptions from "../components/selectedBlogPostPage/BlogPostOptions";
import SelectedBlogPostContent from "../components/selectedBlogPostPage/SelectedBlogPostContent";


// LOADER
export const loader = async ({ params }) => {
  const selectedBlogPost = await fetchSelectedDataFromFirebase('blogPosts', params.id, 'Blog post-a')

  return selectedBlogPost
}

const SelectedBlogPost = () => {
  const selectedBlogPost = useLoaderData()

  return (
    <div className="selected-blog-post-page my-5 mx-3">

      <BlogPostOptions />

      <div className="row">

        {/* row item 1 */}
        <div className={`col-6 col-lg-2 text-center order-1 ${selectedBlogPost.newBlogPostPromoImgOneUrl && 'mb-5 mb-lg-0'}`}>
          {selectedBlogPost.newBlogPostPromoImgOneUrl && (
            <img src={selectedBlogPost.newBlogPostPromoImgOneUrl} alt="promo-img" className="img-fluid rounded-3" style={{ objectFit: 'cover', height: '580px' }} />
          )}
        </div>

        {/* row item 2 */}
        <div className="col-12 col-lg-8 order-3 order-lg-2">
          <SelectedBlogPostContent selectedBlogPost={selectedBlogPost} />
        </div>

        {/* row item 3 */}
        <div className={`col-6 col-lg-2 text-center order-2 order-lg-3 ${selectedBlogPost.newBlogPostPromoImgTwoUrl && 'mb-5 mb-lg-0'}`}>
          {selectedBlogPost.newBlogPostPromoImgTwoUrl && (
            <img src={selectedBlogPost.newBlogPostPromoImgTwoUrl} alt="promo-img" className="img-fluid rounded-3" style={{ objectFit: 'cover', height: '580px' }} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectedBlogPost