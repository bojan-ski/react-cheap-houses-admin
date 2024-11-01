import React from 'react'
import { useLoaderData } from 'react-router-dom'
// components
import NoDataAvailableMessage from '../../NoDataAvailableMessage'
import BlogPostsContainer from './BlogPostsContainer'


const BlogPostsList = () => {
    const allBlogPosts = useLoaderData()

    return (
        <section className="blog-posts mb-5">
            <div className="container">
                {!allBlogPosts || allBlogPosts.length == 0 ? (
                    <NoDataAvailableMessage text='Blog post-ova' />
                ) : (
                    <BlogPostsContainer />
                )}
            </div>
        </section>
    )
}

export default BlogPostsList