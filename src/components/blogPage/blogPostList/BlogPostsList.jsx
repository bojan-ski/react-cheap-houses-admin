import React, { useEffect, useState } from 'react'
// custom hook
import useFetchBlogPageData from '../../../hooks/useFetchBlogPageData'
// components
import NoDataAvailableMessage from '../../NoDataAvailableMessage'
import BlogPostsContainer from './BlogPostsContainer'
import BlogPageSearchOption from './BlogPageSearchOption'



const BlogPostsList = () => {
    const itemsPerPage = 6;
    const { blogPosts, fetchBlogPosts, page } = useFetchBlogPageData(itemsPerPage)

    // Fetch the first page on mount
    useEffect(() => {
        console.log('Blog page - useEffect');

        fetchBlogPosts();
    }, [])

    // search feature - state
    const [searchTerm, setSearchTerm] = useState('')    

    return (
        <section className="blog-posts mb-5">
            <div className="container">

                <BlogPageSearchOption searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetchBlogPosts={fetchBlogPosts} />


                {!blogPosts || blogPosts == 0 ? (
                    <NoDataAvailableMessage text='Blog post-ova' />
                ) : (
                    <BlogPostsContainer blogPosts={blogPosts} />
                )}
            </div>
        </section>
    )
}

export default BlogPostsList