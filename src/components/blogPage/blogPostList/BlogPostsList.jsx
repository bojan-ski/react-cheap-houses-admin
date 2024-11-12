import React, { useEffect, useState } from 'react'
// context
import { useGlobalContext } from '../../../context'
// components
import NoDataAvailableMessage from '../../NoDataAvailableMessage'
import BlogPostsContainer from './BlogPostsContainer'
import Pagination from '../../Pagination'
import SearchOption from '../../SearchOption'


const BlogPostsList = () => {
    const { blogPosts, fetchBlogPosts, curBlogPage } = useGlobalContext()
    // search feature - state
    const [blogSearchTerm, setBlogSearchTerm] = useState('')

    // Fetch the first page on mount
    useEffect(() => {
        console.log('Blog page - useEffect');

        if (blogPosts.length == 0 && blogSearchTerm == ''){
            console.log('get blog data');
            
            fetchBlogPosts();
        }
    }, [])

    return (
        <section className="blog-posts mb-5">
            <div className="container">

                <SearchOption searchTerm={blogSearchTerm} setSearchTerm={setBlogSearchTerm} fetchSearchResults={fetchBlogPosts} placeholderText='Blog Post-a'/>

                {!blogPosts || blogPosts == 0 ? (
                    <NoDataAvailableMessage text='postavljenih Blog post-ova' />
                ) : (
                    <>
                        <BlogPostsContainer blogPosts={blogPosts} />

                        <Pagination fetchData={fetchBlogPosts} page={curBlogPage} queryParam={blogSearchTerm} />
                    </>
                )}
            </div>
        </section>
    )
}

export default BlogPostsList