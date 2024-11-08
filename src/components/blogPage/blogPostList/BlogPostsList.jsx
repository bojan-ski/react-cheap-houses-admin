import React, { useEffect, useState } from 'react'
// context
import { useGlobalContext } from '../../../context'
// components
import BlogPageSearchOption from './BlogPageSearchOption'
import NoDataAvailableMessage from '../../NoDataAvailableMessage'
import BlogPostsContainer from './BlogPostsContainer'
import Pagination from '../../Pagination'


const BlogPostsList = () => {
    const { blogPosts, fetchBlogPosts, curBlogPage } = useGlobalContext()
    // search feature - state
    const [searchTerm, setSearchTerm] = useState('')

    // Fetch the first page on mount
    useEffect(() => {
        console.log('Blog page - useEffect');

        if (blogPosts.length == 0 && searchTerm == ''){
            console.log('get blog data');
            
            fetchBlogPosts();
        }
    }, [])

    return (
        <section className="blog-posts mb-5">
            <div className="container">

                <BlogPageSearchOption searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetchBlogPosts={fetchBlogPosts} />

                {!blogPosts || blogPosts == 0 ? (
                    <NoDataAvailableMessage text='postavljenih Blog post-ova' />
                ) : (
                    <>
                        <BlogPostsContainer blogPosts={blogPosts} />

                        <Pagination fetchData={fetchBlogPosts} page={curBlogPage} queryParam={searchTerm} />
                    </>
                )}
            </div>
        </section>
    )
}

export default BlogPostsList