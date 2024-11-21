import React, { useEffect } from 'react'
// context
import { useGlobalContext } from '../../../context'
// components
import NoDataAvailableMessage from '../../NoDataAvailableMessage'
import BlogPostsContainer from './BlogPostsContainer'
import Pagination from '../../Pagination'
import SearchOption from '../../SearchOption'


const BlogPostsList = () => {
    const { blogSearchTerm, setBlogSearchTerm, blogsDisableSearch, setBlogsDisableSearch, blogPosts, fetchBlogPosts, curBlogPage, isBlogsPageLoading } = useGlobalContext()

    // Fetch the first page on mount
    useEffect(() => {
        if (blogPosts.length === 0 && blogSearchTerm === '') fetchBlogPosts();
    }, [])

    return (
        <section className="blog-posts mb-5">
            <div className="container">

                <SearchOption
                    searchTerm={blogSearchTerm}
                    setSearchTerm={setBlogSearchTerm}
                    disableOption={blogsDisableSearch}
                    setDisableOption={setBlogsDisableSearch}
                    fetchSearchResults={fetchBlogPosts}
                    placeholderText='Blog Post-a'
                />

                {!blogPosts || blogPosts == 0 ? (
                    <NoDataAvailableMessage text='postavljenih Blog post-ova' />
                ) : (
                    <>
                        <BlogPostsContainer blogPosts={blogPosts} />

                        <Pagination fetchData={fetchBlogPosts} page={curBlogPage} queryParam={blogSearchTerm} isLoading={isBlogsPageLoading} />
                    </>
                )}
            </div>
        </section>
    )
}

export default BlogPostsList