import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
// components
import BackButton from '../BackButton'
import DeleteBlogPost from './DeleteBlogPost'


const BlogPostOptions = () => {
    const selectedBlogPost = useLoaderData()
    const params = useParams() 

    return (
        <div className="mb-5">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <BackButton />

                    <DeleteBlogPost blogPostID={params.id} selectedBlogPost={selectedBlogPost} />
                </div>
            </div>
        </div>
    )
}

export default BlogPostOptions